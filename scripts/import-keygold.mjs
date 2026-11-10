import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const source = path.resolve('../KeyGold-Images');
const target = path.resolve('public/images/keygold');
const versions = { '自适应改版': ['responsive', '自适应改版'], '旧PC端页面': ['desktop-legacy', '旧 PC 端'], '旧移动端页面': ['mobile-legacy', '旧移动端'] };
const categories = [
  ['navigation', '首页与导航', /首页|左侧栏|已登录 已领券|分类|侧边|搜索|桌面|pc端-游戏/],
  ['affiliate', '联盟与店铺', /联盟|店铺/],
  ['support', '客服与帮助', /客服|帮助|常见|提问|反馈|安全保障/],
  ['orders', '订单与状态', /订单|账号信息|充值成功|充值未完成/],
  ['commerce', '商品与支付', /商品|支付|游戏币充值/],
  ['rewards', '会员与营销', /积分|优惠券|邀请|VIP|会员|兑换/],
  ['account', '账号与钱包', /个人|登录|注册|密码|邮箱|账号|钱包|消息/],
  ['content', '品牌与内容', /博客|关于/],
];
const words = [ ['首页', 'home'], ['商品', 'product'], ['订单', 'order'], ['支付', 'payment'], ['钱包', 'wallet'], ['积分', 'points'], ['优惠券', 'coupon'], ['邀请', 'invite'], ['个人', 'profile'], ['登录', 'login'], ['密码', 'password'], ['邮箱', 'email'], ['账号', 'account'], ['联盟', 'affiliate'], ['店铺', 'store'], ['客服', 'support'], ['反馈', 'feedback'], ['博客', 'blog'], ['关于', 'about'], ['VIP', 'vip'], ['会员', 'membership'], ['分类', 'category'], ['搜索', 'search'], ['侧边', 'sidebar'], ['导航', 'navigation'] ];
async function walk(dir) {
 const entries = await fs.readdir(dir, { withFileTypes: true });
 const files = await Promise.all(entries.map(e => e.isDirectory() ? walk(path.join(dir,e.name)) : e.name.endsWith('.webp') ? [path.join(dir,e.name)] : []));
 return files.flat();
}
const previous = await fs.readFile('src/data/projects/keygold.json', 'utf8').then(JSON.parse).catch(() => []);
const images = [];
for (const [folder, [version, versionLabel]] of Object.entries(versions)) {
 const files = (await walk(path.join(source,folder))).sort((a,b) => {
  const rank = p => /首页/.test(p) ? 0 : /商品详情/.test(p) ? 1 : 2;
  return rank(a)-rank(b) || a.localeCompare(b,'zh-CN');
 });
 
 for (const [index,file] of files.entries()) {
  const title=path.relative(path.join(source,folder),file).replace(/\.webp$/,'').replaceAll(path.sep,' / ');
  const [category,categoryLabel]=categories.find(([, ,pattern])=>pattern.test(title)) ?? ['navigation','首页与导航'];
  const subject=words.find(([word])=>title.includes(word))?.[1] ?? 'screen';
  const id=`keygold-${version}-${category}-${subject}-${String(index+1).padStart(3,'0')}`;
  const name=`${id}.webp`;
  const directory = path.join(target,category,version);
  await fs.mkdir(path.join(directory,'thumbs'),{recursive:true});
  const metadata=await sharp(file).metadata();
  await fs.copyFile(file,path.join(directory,name));
  await sharp(file).resize({width:480,height:Math.min(1400,Math.round(metadata.height*480/metadata.width)),fit:'cover',position:'top',withoutEnlargement:true}).webp({quality:76}).toFile(path.join(directory,'thumbs',name));
  images.push({ id,title,category,categoryLabel,version,versionLabel,width:metadata.width,height:metadata.height,src:`images/keygold/${category}/${version}/${name}`,thumbnail:`images/keygold/${category}/${version}/thumbs/${name}`,source:path.relative(source,file) });
 }
}
await fs.mkdir('src/data/projects', {recursive:true});
await fs.writeFile('src/data/projects/keygold.json',JSON.stringify(images,null,2)+'\n');
const retained = new Set(images.flatMap(image => [image.src, image.thumbnail]));
for (const image of previous) {
 for (const asset of [image.src, image.thumbnail]) {
  if (!retained.has(asset)) await fs.unlink(path.join('public',asset)).catch(error => { if (error.code !== 'ENOENT') throw error; });
 }
}
console.log(`Imported ${images.length} images with English filenames.`);
