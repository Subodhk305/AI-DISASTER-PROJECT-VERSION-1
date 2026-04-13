import React, { useEffect, useRef, useState } from 'react';
import { Loader2, MapPin, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

export default function WorldMap({ onLocationSelect, selectedLocation, historicalEvents = [] }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(4);
  const [center, setCenter] = useState({ lat: 20.5937, lng: 78.9629 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, lat: 0, lng: 0 });
  const tileCache = useRef({});

  const MIN_ZOOM = 2;
  const MAX_ZOOM = 10;
  const TILE_SIZE = 256;

  const latLonToPixels = (lat, lng, zoom) => {
    const x = (lng + 180) / 360 * Math.pow(2, zoom);
    const y = (1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom);
    return { pixelX: x * TILE_SIZE, pixelY: y * TILE_SIZE };
  };

  const loadTile = (x, y, zoom) => {
    return new Promise((resolve, reject) => {
      const cacheKey = `${zoom}/${x}/${y}`;
      if (tileCache.current[cacheKey]) {
        resolve(tileCache.current[cacheKey]);
        return;
      }
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`;
      img.onload = () => {
        tileCache.current[cacheKey] = img;
        resolve(img);
      };
      img.onerror = reject;
    });
  };

  const drawMap = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    if (width === 0 || height === 0) return;

    setLoading(true);
    ctx.fillStyle = '#0B0F19';
    ctx.fillRect(0, 0, width, height);

    const centerPixel = latLonToPixels(center.lat, center.lng, zoom);
    const startX = Math.floor((centerPixel.pixelX - width / 2) / TILE_SIZE);
    const endX = Math.ceil((centerPixel.pixelX + width / 2) / TILE_SIZE);
    const startY = Math.floor((centerPixel.pixelY - height / 2) / TILE_SIZE);
    const endY = Math.ceil((centerPixel.pixelY + height / 2) / TILE_SIZE);
    const maxTile = Math.pow(2, zoom) - 1;

    const tilePromises = [];
    for (let tx = Math.max(0, startX); tx <= Math.min(maxTile, endX); tx++) {
      for (let ty = Math.max(0, startY); ty <= Math.min(maxTile, endY); ty++) {
        tilePromises.push(loadTile(tx, ty, zoom).catch(() => null));
      }
    }
    const tiles = await Promise.all(tilePromises);
    setLoading(false);

    let idx = 0;
    for (let tx = Math.max(0, startX); tx <= Math.min(maxTile, endX); tx++) {
      for (let ty = Math.max(0, startY); ty <= Math.min(maxTile, endY); ty++) {
        const tile = tiles[idx++];
        if (!tile) continue;
        const tilePixelX = tx * TILE_SIZE;
        const tilePixelY = ty * TILE_SIZE;
        const screenX = (tilePixelX - centerPixel.pixelX) + width / 2;
        const screenY = (tilePixelY - centerPixel.pixelY) + height / 2;
        ctx.drawImage(tile, screenX, screenY, TILE_SIZE, TILE_SIZE);
      }
    }

    // Draw grid lines
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.15)';
    ctx.lineWidth = 1;
    for (let lat = -60; lat <= 60; lat += 30) {
      const { pixelY } = latLonToPixels(lat, 0, zoom);
      const screenY = (pixelY - centerPixel.pixelY) + height / 2;
      if (screenY >= 0 && screenY <= height) {
        ctx.beginPath();
        ctx.moveTo(0, screenY);
        ctx.lineTo(width, screenY);
        ctx.stroke();
        ctx.fillStyle = 'rgba(100, 116, 139, 0.6)';
        ctx.font = '9px monospace';
        ctx.fillText(`${Math.abs(lat)}°${lat >= 0 ? 'N' : 'S'}`, 5, screenY - 2);
      }
    }

    setLoading(false);
  };

  const screenToLatLon = (screenX, screenY, width, height, zoom, center) => {
    const centerPixel = latLonToPixels(center.lat, center.lng, zoom);
    const pixelX = centerPixel.pixelX + (screenX - width / 2);
    const pixelY = centerPixel.pixelY + (screenY - height / 2);
    const x = pixelX / TILE_SIZE;
    const y = pixelY / TILE_SIZE;
    const lng = (x / Math.pow(2, zoom)) * 360 - 180;
    const lat = Math.atan(Math.sinh(Math.PI * (1 - 2 * y / Math.pow(2, zoom)))) * 180 / Math.PI;
    return { lat, lng };
  };

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const screenX = (e.clientX - rect.left) * scaleX;
    const screenY = (e.clientY - rect.top) * scaleY;
    const { lat, lng } = screenToLatLon(screenX, screenY, canvas.width, canvas.height, zoom, center);
    if (onLocationSelect && !isNaN(lat) && !isNaN(lng)) {
      onLocationSelect({ lat, lng, name: `${lat.toFixed(2)}°, ${lng.toFixed(2)}°` });
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -1 : 1;
    const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom + delta));
    if (newZoom !== zoom) setZoom(newZoom);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const rect = canvasRef.current.getBoundingClientRect();
    setDragStart({ x: e.clientX - rect.left, y: e.clientY - rect.top, lat: center.lat, lng: center.lng });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const dx = e.clientX - rect.left - dragStart.x;
    const dy = e.clientY - rect.top - dragStart.y;
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    const lngDelta = dx * 360 / (width * Math.pow(2, zoom - 2));
    const latDelta = dy * 180 / (height * Math.pow(2, zoom - 2));
    setCenter({ lng: dragStart.lng - lngDelta, lat: Math.max(-85, Math.min(85, dragStart.lat + latDelta)) });
    setDragStart({ ...dragStart, x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    if (!container) return;
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      drawMap();
    };
    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(container);
    resizeCanvas();
    return () => observer.disconnect();
  }, []);

  useEffect(() => { if (canvasRef.current) drawMap(); }, [zoom, center]);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden relative cursor-grab active:cursor-grabbing">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full h-full block"
        style={{ background: '#0B0F19' }}
      />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 pointer-events-none">
          <Loader2 size={32} className="text-[#00D4FF] animate-spin" />
        </div>
      )}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <button onClick={() => setZoom(Math.min(MAX_ZOOM, zoom + 1))} className="w-8 h-8 bg-black/70 hover:bg-black/90 rounded-lg flex items-center justify-center"><ZoomIn size={16} className="text-white" /></button>
        <button onClick={() => setZoom(Math.max(MIN_ZOOM, zoom - 1))} className="w-8 h-8 bg-black/70 hover:bg-black/90 rounded-lg flex items-center justify-center"><ZoomOut size={16} className="text-white" /></button>
        <button onClick={() => { setZoom(4); setCenter({ lat: 20.5937, lng: 78.9629 }); }} className="w-8 h-8 bg-black/70 hover:bg-black/90 rounded-lg flex items-center justify-center"><Maximize2 size={14} className="text-white" /></button>
      </div>
      <div className="absolute bottom-4 right-4 bg-black/50 rounded-lg px-2 py-1 text-[10px] text-gray-400 z-10">🖱️ Drag to pan • Scroll to zoom • Click to select</div>
    </div>
  );
}