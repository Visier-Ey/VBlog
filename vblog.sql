-- Enable foreign key support
PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS blogs;
DROP TABLE IF EXISTS lifechips;
DROP TABLE IF EXISTS recent;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS visitors;
DROP TABLE IF EXISTS projects;


-- Create tables
CREATE TABLE IF NOT EXISTS blogs (
    url TEXT
);

CREATE TABLE IF NOT EXISTS lifechips (
    url TEXT,
    title TEXT,
    content TEXT,
    date TEXT,
    type TEXT,
    description TEXT
);

CREATE TABLE IF NOT EXISTS recent (
    type TEXT,
    content TEXT,
    date TEXT DEFAULT CURRENT_TIMESTAMP,
    url TEXT
);


CREATE TABLE IF NOT EXISTS user (
    name TEXT,
    avatarUrl TEXT,
    frameUrl TEXT,
    brief TEXT,
    lover TEXT,
    like TEXT,
    nick TEXT,
    work TEXT,
    age TEXT,
    school TEXT,
    id INTEGER
);


CREATE TABLE IF NOT EXISTS visitors (
    account TEXT,
    password TEXT,
    nick TEXT
);


CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  name TEXT,
  description TEXT,
  cover TEXT,
  introFile TEXT,
  attachments TEXT,
  githubLink TEXT,
  status TEXT,
  createTime TEXT,
  lastUpdateTime TEXT
);

-- -- Insert data into blogs
-- INSERT INTO blogs (url) VALUES ('blog.md');

-- -- Insert data into lifechips
-- INSERT INTO lifechips (url, title, content, date, type, description) VALUES 
-- ('winner.jpg', 'Winner', '获胜', '2024-10-03 00:00:00', 'photo', '险中求胜，顺风开局，逆风收盘'),
-- ('BlueSky.jpg', 'Relax~', '好看，很久没有这么轻松的感觉了，什么时光定格，我想说的不过如此吧', '2024-10-02 00:00:00', 'photo', '蓝天白云，晴朗的阳光'),
-- ('zbg.mp4', '秋游', '帅！子博哥太帅了！', '2024-10-02 00:00:00', 'video', NULL),
-- ('baker.jpg', 'Baker ZJS', '如标题所说', '2024-10-03 00:00:00', 'photo', ''),
-- ('yyhjs.jpg', '幽影黄金树', '奇异的光影叠加，层层漫射穿透，投下斑驳金黄的幽影', '2024-10-19 00:00:00', 'photo', NULL),
-- ('mf.jpg', '要用模法打败魔法', '所幸不会挂科，因为专业课不包括该内容', '2024-10-20 00:00:00', 'photo', '听说了吗？哈利波特要重映了，还不赶快去学模法'),
-- ('1730605448760-2308894.jpg', 'BEST MEET', '', NULL, NULL, '');

-- -- Insert data into poetry
-- INSERT INTO poetry (title, writer, recipient, content, date, manuscriptUrl) VALUES 
-- (NULL, 'Visier', 'Soul', 'Welcome to world', NULL, NULL),
-- (NULL, 'Soul', 'Visier', 'Fuck you world', NULL, NULL);

-- -- Insert data into recent
-- INSERT INTO recent (type, content, date, url) VALUES 
-- ('notice', 'Lazy Author, Update Randomly', '2024-11-03 12:23:49', NULL),
-- ('about', NULL, '2024-11-03 12:54:45', 'about.md'),
-- ('event', '', '2024-11-03 15:42:54', '1730619774271-839469135.md');


-- -- Insert data into user
-- INSERT INTO user (name, avatarUrl, frameUrl, brief, lover, like, nick, work, age, school, id) VALUES 
-- ('小龙', 'https://avatars.akamai.steamstatic.com/7087fdfb89c501657a8e6e7854c2ada0e0852567_full.jpg', 'https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/253230/27ef3d62a0e42bf4ac60d426f2f172e1790ec0fd.png', '那些奇异的光，广袤清晰的声响，强烈侵袭我的神经的芬芳花香，以及那丰富不可思议的触感，每一次呼吸微微颤动嘴唇翕合。我爱我一切一切的感官，爱这一切一切赋予我的世界，我已经把我所有的深情都给了她', 'X', 'X', 'Visier', '大二狗', '十九', '浙江埋土', 1);

-- -- Insert data into visitors
-- INSERT INTO visitors (account, password, nick) VALUES 
-- ('visitor', '$2a$10$MF2xiuRQo5.AMYzEF4L9ze4eU.Cj0NbZFCu7tgo6koKccW1/qpgxe', 'HaHaHaHaHa'),
-- ('visitors', '$2a$10$tbRVuzpucW2Y9YHW8pbuVO.LjJBg1cgtRkkTEveFK.Tkt6dHUrbhm', 'HHH');
