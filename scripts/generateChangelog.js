import { execSync } from "child_process";
import { existsSync, mkdirSync, appendFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// === Lấy ngày và giờ hiện tại ===
const now = new Date();
const date = now.toISOString().split("T")[0]; // yyyy-mm-dd
const time = now.toTimeString().slice(0, 5);  // hh:mm

// === Thực hiện git diff ===
let diff = "";
try {
  diff = execSync("git diff", { encoding: "utf-8" });
} catch (error) {
  console.error("❌ Lỗi khi chạy git diff:", error.message);
  process.exit(1);
}

if (!diff.trim()) {
  console.log("⚠️ Không có thay đổi nào để ghi log.");
  process.exit(0);
}

// === Tạo thư mục changelog nếu chưa có ===
const changelogDir = join(__dirname, "../changelogs");
if (!existsSync(changelogDir)) {
  mkdirSync(changelogDir);
}

// === Ghi vào file changelog/yyyy-mm-dd.md ===
const filePath = join(changelogDir, `${date}.md`);
const content = `\n## Lần chạy lúc ${time}\n\n\`\`\`diff\n${diff}\n\`\`\`\n`;

appendFileSync(filePath, content);

console.log(`✅ Đã ghi git diff vào: changelog/${date}.md`);
