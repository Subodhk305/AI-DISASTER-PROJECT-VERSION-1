import React, { useEffect, useRef } from 'react';

export default function GaugeChart({ value, color = '#00D4FF' }) {
  const canvasRef = useRef(null);
  const percentage = Math.min(100, value);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height - 20;
    const radius = Math.min(width, height) / 2 - 10;
    const startAngle = -Math.PI;
    const endAngle = 0;

    ctx.clearRect(0, 0, width, height);

    // Background arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = '#1A2540';
    ctx.lineWidth = 12;
    ctx.stroke();

    // Value arc
    const angle = startAngle + (percentage / 100) * Math.PI;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, angle);
    ctx.strokeStyle = color;
    ctx.lineWidth = 12;
    ctx.stroke();

    // Center text
    ctx.font = 'bold 20px monospace';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${value.toFixed(1)}%`, centerX, centerY - 15);

    ctx.font = '10px monospace';
    ctx.fillStyle = '#64748B';
    ctx.fillText('Probability', centerX, centerY + 10);
  }, [value, color, percentage]);

  return <canvas ref={canvasRef} width={150} height={120} className="w-full" />;
}