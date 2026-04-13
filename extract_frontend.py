import os

# 👉 Change this to your frontend path
folder_path = r"D:\ai-disaster-system\frontend"

output_file = "frontend_code.txt"

# file types you want (IMPORTANT)
allowed_extensions = ('.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.json')

with open(output_file, "w", encoding="utf-8") as outfile:
    for root, dirs, files in os.walk(folder_path):

        # ❌ Skip unnecessary folders
        dirs[:] = [d for d in dirs if d not in ("node_modules", ".git", "dist", "build", "venv")]

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

print("✅ Frontend code extracted successfully!")