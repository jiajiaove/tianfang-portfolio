import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const source = path.resolve("Mangatoon");
const target = path.resolve("public/images/mangatoon");

const scopes = [
  ["111", "creator-studio", "创作与作者端"],
  ["头像框", "avatar-customization", "角色与装扮"],
];

const categories = [
  ["creator", "创作与作者", /签约|创建作品|创建章节|作品|驻站|电子签名|签名|打赏|申请/],
  ["avatar", "角色与装扮", /角色|形象|头像|体型|配饰|服装|头发|发型|眼睛|肤色|性别|年龄|气质|喜好|面部/],
  ["reading", "阅读与书架", /漫画|小说|阅读|书架|书摘|章节|翻页/],
  ["social", "社交与互动", /聊天|漂流瓶|社区|话题|发帖|社交|分享|消息|随便聊|收礼/],
  ["rewards", "福利与成长", /签到|福利|奖励|宝箱|积分|魅力|金币|充值|激励|广告|任务|免费次数/],
  ["profile", "个人与设置", /个人|设置|地址|登录|退出|记录|通知|反馈|中心/],
  ["home", "首页与探索", /首页|场景|Toon|Novel|Chat Story|Group|更多功能|选择作品/],
];

const subjects = [
  ["首页", "home"], ["漫画", "comic"], ["小说", "novel"], ["阅读", "reading"],
  ["书架", "bookshelf"], ["书摘", "quote"], ["聊天", "chat"], ["漂流瓶", "bottle"],
  ["角色", "avatar"], ["头像", "portrait"], ["服装", "outfit"], ["配饰", "accessory"],
  ["签到", "check-in"], ["福利", "rewards"], ["金币", "coins"], ["个人", "profile"],
  ["创建", "create"], ["签约", "contract"], ["场景", "scene"], ["生成", "generate"],
  ["登录", "login"], ["消息", "message"], ["社区", "community"], ["设置", "settings"],
];

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const children = await Promise.all(entries.map((entry) => {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(file);
    return /\.(png|jpe?g|webp)$/i.test(entry.name) ? [file] : [];
  }));
  return children.flat();
}

function scopeFor(file) {
  const relative = path.relative(source, file);
  const match = scopes.find(([folder]) => relative.split(path.sep)[0] === folder);
  return match ? [match[1], match[2]] : ["app-experience", "APP 产品体验"];
}

const files = (await walk(source)).sort((a, b) => a.localeCompare(b, "zh-CN"));
const images = [];
const usedNames = new Set();

for (const [index, file] of files.entries()) {
  const relative = path.relative(source, file);
  const title = relative.replace(/\.(png|jpe?g|webp)$/i, "").replaceAll(path.sep, " / ");
  const [version, versionLabel] = scopeFor(file);
  const [category, categoryLabel] = categories.find(([, , pattern]) => pattern.test(title)) ?? ["home", "首页与探索"];
  const subject = subjects.find(([word]) => title.includes(word))?.[1] ?? "screen";
  const baseId = `mangatoon-${version}-${category}-${subject}-${String(index + 1).padStart(3, "0")}`;
  let id = baseId;
  let duplicate = 2;
  while (usedNames.has(id)) id = `${baseId}-${duplicate++}`;
  usedNames.add(id);

  const ext = path.extname(file).toLowerCase() === ".jpg" ? ".jpg" : path.extname(file).toLowerCase();
  const name = `${id}${ext}`;
  const destination = path.join(target, category, version);
  await fs.mkdir(path.join(destination, "thumbs"), { recursive: true });
  const metadata = await sharp(file).metadata();
  await fs.copyFile(file, path.join(destination, name));
  await sharp(file)
    .resize({
      width: 480,
      height: Math.min(1400, Math.round((metadata.height * 480) / metadata.width)),
      fit: "cover",
      position: "top",
      withoutEnlargement: true,
    })
    .webp({ quality: 76 })
    .toFile(path.join(destination, "thumbs", `${id}.webp`));

  images.push({
    id,
    title,
    category,
    categoryLabel,
    version,
    versionLabel,
    width: metadata.width,
    height: metadata.height,
    src: `images/mangatoon/${category}/${version}/${name}`,
    thumbnail: `images/mangatoon/${category}/${version}/thumbs/${id}.webp`,
    source: relative,
  });
}

await fs.mkdir("src/data/projects", { recursive: true });
await fs.writeFile("src/data/projects/mangatoon.json", `${JSON.stringify(images, null, 2)}\n`);
console.log(`Imported ${images.length} MangaToon images with English filenames.`);
