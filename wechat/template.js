/**
 * 类型：文本、图片、语音、视频、音乐、图文
 */

module.exports = options => {
  const type = options.type;
  let template = `<xml>
    <ToUserName><![CDATA[${options.to}]]></ToUserName>
    <FromUserName><![CDATA[${options.from}]]></FromUserName>
    <CreateTime>${Date.now()}</CreateTime>
    <MsgType><![CDATA[${type}]]></MsgType>`;
  if (type === 'text') {
    template += `<Content><![CDATA[${options.msg}]]></Content>`;
  }
  else if (type === 'image') {
    template += `<Image>
      <MediaId><![CDATA[${options.mediaId}]]></MediaId>
    </Image>`;
  }
  else if (type === 'voice') {
    template += `<Voice>
      <MediaId><![CDATA[${options.mediaId}]]></MediaId>
    </Voice>`;
  }
  else if (type === 'video') {
    template += `<Video>
      <MediaId><![CDATA[${options.mediaId}]]></MediaId>
      <Title><![CDATA[${options.title}]]></Title>
      <Description><![CDATA[${options.description}]]></Description>
    </Video>`;
  }
  else if (type === 'music') {
    template += `<Music>
      <Title><![CDATA[${options.title}]]></Title>
      <Description><![CDATA[${options.description}]]></Description>
      <MusicUrl><![CDATA[${options.music_url}]]></MusicUrl>
      <HQMusicUrl><![CDATA[${options.hq_music_url}]]></HQMusicUrl>
      <ThumbMediaId><![CDATA[${options.mediaId}]]></ThumbMediaId>
    </Music>`;
  }
  else if (type === 'news') {
    template += `<ArticleCount>1</ArticleCount>
    <Articles>
      <item>
        <Title><![CDATA[${options.title}]]></Title>
        <Description><![CDATA[${options.description}]]></Description>
        <PicUrl><![CDATA[${options.pic_url}]]></PicUrl>
        <Url><![CDATA[${options.url}]]></Url>
      </item>
    </Articles>`;
  }
  return template + '</xml>';
}