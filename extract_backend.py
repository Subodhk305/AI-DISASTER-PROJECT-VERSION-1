import os

# 👉 Backend path (from your project)
folder_path = r"D:\ai-disaster-system\backend-gateway"

output_file = "backend_code.txt"

# Include backend-related files
allowed_extensions = ('.py', '.json', '.yaml', '.yml', '.env', '.txt')

with open(output_file, "w", encoding="utf-8") as outfile:
    for root, dirs, files in os.walk(folder_path):

        # ❌ Skip unnecessary folders
        dirs[:] = [d for d in dirs if d not in ("venv", ".git", "__pycache__", "node_modules")]

        for file in files:
            if not file.endswith(allowed_extensions):
                continue

            file_path = os.path.join(root, file)

            outfile.write(f"\n\n===== FILE: {file_path} =====\n\n")

            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    outfile.write(f.read())
            except Exception as e:
                outfile.write(f"[Error reading file: {e}]\n")

print("✅ Backend code extracted successfully!")