import type { SpeakingCard } from "@/lib/types";

type PhraseRow = {
  hanzi: string;
  pinyin: string;
  english: string;
};

const phraseRows: PhraseRow[] = [
  {
    hanzi: "其实",
    pinyin: "qíshí",
    english: "actually"
  },
  {
    hanzi: "不仅如此",
    pinyin: "bù jǐn rú cǐ",
    english: "not only that"
  },
  {
    hanzi: "顺便问一下",
    pinyin: "shùnbiàn wèn yíxià",
    english: "by the way"
  },
  {
    hanzi: "难怪",
    pinyin: "nánguài",
    english: "no wonder"
  },
  {
    hanzi: "原来如此",
    pinyin: "yuánlái rúcǐ",
    english: "so that's how it is"
  },
  {
    hanzi: "差不多",
    pinyin: "chàbuduō",
    english: "almost / roughly"
  },
  {
    hanzi: "越来越",
    pinyin: "yuè lái yuè",
    english: "more and more"
  },
  {
    hanzi: "无所谓",
    pinyin: "wúsuǒwèi",
    english: "it doesn't matter"
  },
  {
    hanzi: "好不容易",
    pinyin: "hǎo bù róngyì",
    english: "with great difficulty"
  },
  {
    hanzi: "一方面…另一方面…",
    pinyin: "yì fāngmiàn… lìng yì fāngmiàn…",
    english: "on one hand… on the other hand…"
  },
  {
    hanzi: "看来",
    pinyin: "kànlái",
    english: "it seems"
  },
  {
    hanzi: "据说",
    pinyin: "jùshuō",
    english: "it is said"
  },
  {
    hanzi: "既然",
    pinyin: "jìrán",
    english: "since / now that"
  },
  {
    hanzi: "否则",
    pinyin: "fǒuzé",
    english: "otherwise"
  },
  {
    hanzi: "到底",
    pinyin: "dàodǐ",
    english: "after all / in the end"
  },
  {
    hanzi: "几乎",
    pinyin: "jīhū",
    english: "almost"
  },
  {
    hanzi: "稍微",
    pinyin: "shāowēi",
    english: "slightly"
  },
  {
    hanzi: "尽管",
    pinyin: "jǐnguǎn",
    english: "even though"
  },
  {
    hanzi: "毕竟",
    pinyin: "bìjìng",
    english: "after all"
  },
  {
    hanzi: "难免",
    pinyin: "nánmiǎn",
    english: "hard to avoid"
  },
  {
    hanzi: "你最近忙什么呢？",
    pinyin: "nǐ zuìjìn máng shénme ne?",
    english: "what have you been busy with lately?"
  },
  {
    hanzi: "这件事不太容易解释。",
    pinyin: "zhè jiàn shì bú tài róngyì jiěshì",
    english: "this matter is not easy to explain"
  },
  {
    hanzi: "我差点忘了。",
    pinyin: "wǒ chàdiǎn wàng le",
    english: "I almost forgot"
  },
  {
    hanzi: "我早就告诉过你。",
    pinyin: "wǒ zǎo jiù gàosu guò nǐ",
    english: "I told you long ago"
  },
  {
    hanzi: "事情变得越来越复杂。",
    pinyin: "shìqing biàn de yuè lái yuè fùzá",
    english: "things are becoming more complicated"
  },
  {
    hanzi: "他看起来很有经验。",
    pinyin: "tā kàn qǐlái hěn yǒu jīngyàn",
    english: "he looks very experienced"
  },
  {
    hanzi: "我对这个问题很好奇。",
    pinyin: "wǒ duì zhège wèntí hěn hàoqí",
    english: "I'm curious about this question"
  },
  {
    hanzi: "你有没有别的建议？",
    pinyin: "nǐ yǒu méiyǒu bié de jiànyì?",
    english: "do you have any other suggestions?"
  },
  {
    hanzi: "这取决于情况。",
    pinyin: "zhè qǔjué yú qíngkuàng",
    english: "that depends on the situation"
  },
  {
    hanzi: "我需要考虑一下。",
    pinyin: "wǒ xūyào kǎolǜ yíxià",
    english: "I need to think about it"
  },
  {
    hanzi: "这听起来很合理。",
    pinyin: "zhè tīng qǐlái hěn hélǐ",
    english: "that sounds reasonable"
  },
  {
    hanzi: "你怎么会这么想？",
    pinyin: "nǐ zěnme huì zhème xiǎng?",
    english: "how could you think that?"
  },
  {
    hanzi: "我完全同意。",
    pinyin: "wǒ wánquán tóngyì",
    english: "I completely agree"
  },
  {
    hanzi: "我不太确定。",
    pinyin: "wǒ bú tài quèdìng",
    english: "I'm not very sure"
  },
  {
    hanzi: "其实没那么严重。",
    pinyin: "qíshí méi nàme yánzhòng",
    english: "actually it's not that serious"
  },
  {
    hanzi: "你说得有道理。",
    pinyin: "nǐ shuō de yǒu dàolǐ",
    english: "you make a good point"
  },
  {
    hanzi: "让我想想。",
    pinyin: "ràng wǒ xiǎng xiang",
    english: "let me think"
  },
  {
    hanzi: "你能解释一下吗？",
    pinyin: "nǐ néng jiěshì yíxià ma?",
    english: "can you explain it?"
  },
  {
    hanzi: "事情没有那么简单。",
    pinyin: "shìqing méi yǒu nàme jiǎndān",
    english: "things aren't that simple"
  },
  {
    hanzi: "这让我很惊讶。",
    pinyin: "zhè ràng wǒ hěn jīngyà",
    english: "this surprises me"
  },
  {
    hanzi: "我已经习惯了。",
    pinyin: "wǒ yǐjīng xíguàn le",
    english: "I'm already used to it"
  },
  {
    hanzi: "你打算什么时候去？",
    pinyin: "nǐ dǎsuàn shénme shíhou qù?",
    english: "when do you plan to go?"
  },
  {
    hanzi: "我突然想起来一件事。",
    pinyin: "wǒ tūrán xiǎng qǐlái yí jiàn shì",
    english: "I suddenly remembered something"
  },
  {
    hanzi: "事情进展得怎么样？",
    pinyin: "shìqing jìnzhǎn de zěnmeyàng?",
    english: "how are things progressing?"
  },
  {
    hanzi: "我对这个结果很满意。",
    pinyin: "wǒ duì zhège jiéguǒ hěn mǎnyì",
    english: "I'm satisfied with this result"
  },
  {
    hanzi: "他好像不太高兴。",
    pinyin: "tā hǎoxiàng bú tài gāoxìng",
    english: "he doesn't seem very happy"
  },
  {
    hanzi: "这可能是个误会。",
    pinyin: "zhè kěnéng shì gè wùhuì",
    english: "this might be a misunderstanding"
  },
  {
    hanzi: "你怎么看这个问题？",
    pinyin: "nǐ zěnme kàn zhège wèntí?",
    english: "what do you think about this issue?"
  },
  {
    hanzi: "我完全没想到。",
    pinyin: "wǒ wánquán méi xiǎngdào",
    english: "I didn't expect it at all"
  },
  {
    hanzi: "这件事很值得讨论。",
    pinyin: "zhè jiàn shì hěn zhídé tǎolùn",
    english: "this matter is worth discussing"
  },
  {
    hanzi: "时间过得真快。",
    pinyin: "shíjiān guò de zhēn kuài",
    english: "time passes quickly"
  },
  {
    hanzi: "他终于明白了。",
    pinyin: "tā zhōngyú míngbai le",
    english: "he finally understood"
  },
  {
    hanzi: "我需要一点时间。",
    pinyin: "wǒ xūyào yìdiǎn shíjiān",
    english: "I need a little time"
  },
  {
    hanzi: "你是不是误会了？",
    pinyin: "nǐ shì bú shì wùhuì le?",
    english: "did you misunderstand?"
  },
  {
    hanzi: "情况比我想象的复杂。",
    pinyin: "qíngkuàng bǐ wǒ xiǎngxiàng de fùzá",
    english: "the situation is more complicated than I imagined"
  },
  {
    hanzi: "我一直在找这个。",
    pinyin: "wǒ yìzhí zài zhǎo zhège",
    english: "I've been looking for this"
  },
  {
    hanzi: "这对我来说很重要。",
    pinyin: "zhè duì wǒ lái shuō hěn zhòngyào",
    english: "this is important to me"
  },
  {
    hanzi: "我有点担心。",
    pinyin: "wǒ yǒudiǎn dānxīn",
    english: "I'm a bit worried"
  },
  {
    hanzi: "他似乎很忙。",
    pinyin: "tā sìhū hěn máng",
    english: "he seems very busy"
  },
  {
    hanzi: "这让我想到一个问题。",
    pinyin: "zhè ràng wǒ xiǎngdào yí gè wèntí",
    english: "this makes me think of a question"
  },
  {
    hanzi: "事情没有按计划进行。",
    pinyin: "shìqing méi yǒu àn jìhuà jìnxíng",
    english: "things didn't go according to plan"
  },
  {
    hanzi: "你最好早点出发。",
    pinyin: "nǐ zuì hǎo zǎodiǎn chūfā",
    english: "you'd better leave earlier"
  },
  {
    hanzi: "这听起来不太现实。",
    pinyin: "zhè tīng qǐlái bú tài xiànshí",
    english: "that sounds unrealistic"
  },
  {
    hanzi: "我渐渐明白了。",
    pinyin: "wǒ jiànjiàn míngbai le",
    english: "I gradually understood"
  },
  {
    hanzi: "结果完全出乎意料。",
    pinyin: "jiéguǒ wánquán chūhū yìliào",
    english: "the result was completely unexpected"
  },
  {
    hanzi: "我正在考虑换工作。",
    pinyin: "wǒ zhèngzài kǎolǜ huàn gōngzuò",
    english: "I'm considering changing jobs"
  },
  {
    hanzi: "这件事影响很大。",
    pinyin: "zhè jiàn shì yǐngxiǎng hěn dà",
    english: "this matter has a big impact"
  },
  {
    hanzi: "事情终于解决了。",
    pinyin: "shìqing zhōngyú jiějué le",
    english: "the problem was finally solved"
  },
  {
    hanzi: "我有点不太明白。",
    pinyin: "wǒ yǒudiǎn bú tài míngbai",
    english: "I don't quite understand"
  },
  {
    hanzi: "这让我想起以前的经历。",
    pinyin: "zhè ràng wǒ xiǎng qǐ yǐqián de jīnglì",
    english: "this reminds me of past experiences"
  },
  {
    hanzi: "他突然改变了主意。",
    pinyin: "tā tūrán gǎibiàn le zhǔyi",
    english: "he suddenly changed his mind"
  },
  {
    hanzi: "事情变得越来越困难。",
    pinyin: "shìqing biàn de yuè lái yuè kùnnan",
    english: "things are becoming more difficult"
  },
  {
    hanzi: "我需要更多信息。",
    pinyin: "wǒ xūyào gèng duō xìnxī",
    english: "I need more information"
  },
  {
    hanzi: "这个问题值得思考。",
    pinyin: "zhège wèntí zhídé sīkǎo",
    english: "this question is worth thinking about"
  },
  {
    hanzi: "你可以再说一遍吗？",
    pinyin: "nǐ kěyǐ zài shuō yí biàn ma?",
    english: "can you say it again?"
  },
  {
    hanzi: "这不是重点。",
    pinyin: "zhè bú shì zhòngdiǎn",
    english: "that's not the main point"
  },
  {
    hanzi: "重点是我们怎么解决。",
    pinyin: "zhòngdiǎn shì wǒmen zěnme jiějué",
    english: "the key is how we solve it"
  },
  {
    hanzi: "这让我很困惑。",
    pinyin: "zhè ràng wǒ hěn kùnhuò",
    english: "this confuses me"
  },
  {
    hanzi: "事情正在慢慢好转。",
    pinyin: "shìqing zhèngzài mànman hǎozhuǎn",
    english: "things are gradually improving"
  },
  {
    hanzi: "他一直在努力。",
    pinyin: "tā yìzhí zài nǔlì",
    english: "he has been working hard"
  },
  {
    hanzi: "我不太习惯这种方式。",
    pinyin: "wǒ bú tài xíguàn zhè zhǒng fāngshì",
    english: "I'm not used to this approach"
  },
  {
    hanzi: "这听起来有点奇怪。",
    pinyin: "zhè tīng qǐlái yǒudiǎn qíguài",
    english: "that sounds a bit strange"
  },
  {
    hanzi: "事情比想象中容易。",
    pinyin: "shìqing bǐ xiǎngxiàng zhōng róngyì",
    english: "things are easier than expected"
  },
  {
    hanzi: "我完全理解你的意思。",
    pinyin: "wǒ wánquán lǐjiě nǐ de yìsi",
    english: "I completely understand what you mean"
  },
  {
    hanzi: "你觉得怎么样？",
    pinyin: "nǐ juéde zěnmeyàng?",
    english: "what do you think?"
  },
  {
    hanzi: "我需要更多时间练习。",
    pinyin: "wǒ xūyào gèng duō shíjiān liànxí",
    english: "I need more time to practice"
  },
  {
    hanzi: "他很擅长解释问题。",
    pinyin: "tā hěn shàncháng jiěshì wèntí",
    english: "he is good at explaining problems"
  },
  {
    hanzi: "这让我学到了很多。",
    pinyin: "zhè ràng wǒ xué dào le hěn duō",
    english: "this taught me a lot"
  },
  {
    hanzi: "我希望事情会变好。",
    pinyin: "wǒ xīwàng shìqing huì biàn hǎo",
    english: "I hope things will get better"
  },
  {
    hanzi: "这个想法很有意思。",
    pinyin: "zhège xiǎngfǎ hěn yǒu yìsi",
    english: "this idea is interesting"
  },
  {
    hanzi: "事情没有那么糟糕。",
    pinyin: "shìqing méi yǒu nàme zāogāo",
    english: "things aren't that bad"
  },
  {
    hanzi: "我需要一点帮助。",
    pinyin: "wǒ xūyào yìdiǎn bāngzhù",
    english: "I need a little help"
  },
  {
    hanzi: "这件事让我很困扰。",
    pinyin: "zhè jiàn shì ràng wǒ hěn kùnrǎo",
    english: "this troubles me"
  },
  {
    hanzi: "他好像知道答案。",
    pinyin: "tā hǎoxiàng zhīdào dá'àn",
    english: "he seems to know the answer"
  },
  {
    hanzi: "我不太同意这个观点。",
    pinyin: "wǒ bú tài tóngyì zhège guāndiǎn",
    english: "I don't quite agree with this view"
  },
  {
    hanzi: "这件事值得注意。",
    pinyin: "zhè jiàn shì zhídé zhùyì",
    english: "this matter deserves attention"
  },
  {
    hanzi: "事情的发展很有意思。",
    pinyin: "shìqing de fāzhǎn hěn yǒu yìsi",
    english: "the development of events is interesting"
  },
  {
    hanzi: "我慢慢开始理解。",
    pinyin: "wǒ mànman kāishǐ lǐjiě",
    english: "I'm gradually starting to understand"
  },
  {
    hanzi: "他好像有点紧张。",
    pinyin: "tā hǎoxiàng yǒudiǎn jǐnzhāng",
    english: "he seems a bit nervous"
  },
  {
    hanzi: "这确实是个挑战。",
    pinyin: "zhè quèshí shì gè tiǎozhàn",
    english: "this is indeed a challenge"
  }
];

function expandAcceptedEnglishAnswers(english: string) {
  const variants = new Set<string>();
  const normalizedEnglish = english.trim();

  if (normalizedEnglish) {
    variants.add(normalizedEnglish);
  }

  if (normalizedEnglish.includes("/")) {
    for (const variant of normalizedEnglish
      .split("/")
      .map((part) => part.trim())
      .filter(Boolean)) {
      variants.add(variant);
    }
  }

  return Array.from(variants);
}

export const currentDeck: SpeakingCard[] = phraseRows.map((row, index) => ({
  id: `phrase-${String(index + 1).padStart(3, "0")}`,
  hanzi: row.hanzi,
  pinyin: row.pinyin,
  englishAnswer: row.english,
  acceptedEnglishAnswers: expandAcceptedEnglishAnswers(row.english)
}));
