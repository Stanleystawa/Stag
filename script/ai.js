const axios = require("axios");

module.exports.config = {
  name: "ai",
  version: "1.0.0",
  hasPermission: 0,
  credits: "𝖥𝗋𝖺𝗇𝖼𝗂𝗌 𝖫𝗈𝗒𝖽 𝖱𝖺𝗏𝖺𝗅 𝖠𝖯𝖨 𝗉𝗋𝗈𝗏𝗂𝖽𝖾𝖽 𝖻𝗒 𝖧𝖺𝗓𝖾𝖾𝗒 𝖶𝗎",
  description: "𝗔𝗜 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝗆𝖺𝖽𝖾 𝖻𝗒 𝖥𝗋𝖺𝗇𝖼𝗂𝗌 𝖫𝗈𝗒𝖽 𝖱𝖺𝗏𝖺𝗅 𝗂𝗌 𝖺𝗇 𝖠𝗋𝗍𝗂𝖿𝗂𝖼𝗂𝖺𝗅 𝖨𝗇𝗍𝖾𝗅𝗅𝗂𝗀𝖾𝗇𝖼𝖾 ( 𝖠𝖨 ) 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝖺𝗉𝗂 𝗈𝖿 𝖧𝖺𝗓𝖾𝖾𝗒 𝖶𝗎 𝗍𝗁𝖺𝗍 𝖼𝖺𝗇 𝗁𝖾𝗅𝗉 𝗒𝗈𝗎 𝗂𝗇 𝗒𝗈𝗎𝗋 𝖺𝗌𝗌𝗂𝗀𝗇𝗆𝖾𝗇𝗍𝗌.",
  commandCategory: "𝗘𝗗𝗨𝗖𝗔𝗧𝗜𝗢𝗡𝗔𝗟",
  usePrefix: false,
  usages: "[query/prompt]",
  cooldowns: 0,
};

let lastQuery = "";

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;

  if (!args[0]) {
    api.sendMessage("ℹ️ | 𝖬𝖺𝗌𝗍𝖾𝗋, 𝗉𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝗌𝗈𝗆𝖾 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇𝗌.", threadID, messageID);
    return;
  }

  const query = args.join(" ");

  if (query === lastQuery) {
    api.sendMessage("🕰️ | 𝖴𝗉𝖽𝖺𝗍𝖾𝖽 𝗍𝗁𝖾 𝖺𝗇𝗌𝗐𝖾𝗋 𝗂𝗇𝗍𝗈 𝗍𝗁𝖾 𝗉𝗋𝖾𝗏𝗂𝗈𝗎𝗌 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇", threadID, messageID);
    return;
  } else {
    lastQuery = query;
  }

  api.sendMessage("🔎 | 𝗔𝗜 𝗂𝗌 𝖺𝗇𝗌𝗐𝖾𝗋𝗂𝗇𝗀 𝗍𝗈 𝗒𝗈𝗎𝗋 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍.", threadID, messageID);

  try {
    const response = await axios.get(`https://code-merge-api-hazeyy01.replit.app/blackbox/ask?q=${encodeURIComponent(query)}`);

    if (response.status === 200 && response.data && response.data.message) {
      const answer = response.data.message;
      const formattedAnswer = formatFont(answer); // Apply font formatting
      api.sendMessage("🌟 | 𝗥𝗘𝗦𝗣𝗢𝗡𝗗\n━━━━━━━━━━━━━━━━━━\n" + formattedAnswer, threadID, messageID);
    } else {
      api.sendMessage("❎ | 𝖳𝗁𝖾𝗋𝖾 𝗂𝗌 𝗇𝗈 𝗋𝖾𝗅𝖾𝗏𝖺𝗇𝗍 𝖺𝗇𝗌𝗐𝖾𝗋 𝗍𝗈 𝗍𝗁𝖺𝗍, 𝖯𝗅𝖾𝖺𝗌𝖾 𝖻𝖾 𝗌𝗉𝖾𝖼𝗂𝖿𝗂𝖼 𝗈𝗋 𝗀𝗂𝗏𝖾 𝗆𝗈𝗋𝖾 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇 𝗍𝗈 𝗒𝗈𝗎𝗋 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇.", threadID, messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("🔴 | 𝖲𝗈𝗆𝖾𝗍𝗁𝗂𝗇𝗀 𝗐𝖾𝗇𝗍 𝗐𝗋𝗈𝗇𝗀 𝗍𝗈 𝗍𝗁𝖾 𝖠𝖯𝖨, 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.\n\n " + error, threadID, messageID);
    return;
  }
};

function formatFont(text) {
    const fontMapping = {
    a: "𝖺",
    b: "𝖻",
    c: "𝖼",
    d: "𝖽",
    e: "𝖾",
    f: "𝖿",
    g: "𝗀",
    h: "𝗁",
    i: "𝗂",
    j: "𝗃",
    k: "𝗄",
    l: "𝗅",
    m: "𝗆",
    n: "𝗇",
    o: "𝗈",
    p: "𝗉",
    q: "𝗊",
    r: "𝗋",
    s: "𝗌",
    t: "𝗍",
    u: "𝗎",
    v: "𝗏",
    w: "𝗐",
    x: "𝗑",
    y: "𝗒",
    z: "𝗓",
    A: "𝖠",
    B: "𝖡",
    C: "𝖢",
    D: "𝖣",
    E: "𝖤",
    F: "𝖥",
    G: "𝖦",
    H: "𝖧",
    I: "𝖨",
    J: "𝖩",
    K: "𝖪",
    L: "𝖫",
    M: "𝖬",
    N: "𝖭",
    O: "𝖮",
    P: "𝖯",
    Q: "𝖰",
    R: "𝖱",
    S: "𝖲",
    T: "𝖳",
    U: "𝖴",
    V: "𝖵",
    W: "𝖶",
    X: "𝖷",
    Y: "𝖸",
    Z: "𝖹"
  };

  let formattedText = "";
  for (const char of text) {
    if (char in fontMapping) {
      formattedText += fontMapping[char];
    } else {
      formattedText += char;
    }
  }
  return formattedText;
}
