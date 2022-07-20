import React, { useState } from 'react';
import { Check, CopyAll } from '@mui/icons-material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useLanguage } from '../../hooks';
import {
  EmailShareButton,
  FacebookShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  PinterestIcon,
  PinterestShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

import './styles.scss';

interface Props {
  url: string,
  media?: string,
  title?: string,
}

const Share = ({ url, media, title }: Props) => {
  const [copied, setCopied] = useState(false);
  const LANG = useLanguage();

  return (
    <div className='share'>
      <div className="share__wrapper">
        <h1>{LANG.MISC.SHARE}</h1>
        <div className="share__icons">
          <EmailShareButton children={<EmailIcon size={40} round={true} />} url={url} subject={"Sharefood | " + title} />
          <FacebookShareButton children={<FacebookIcon size={40} round={true} />} url={url} quote={"Sharefood | " + title} />
          <RedditShareButton children={<RedditIcon size={40} round={true} />} url={url} title={"Sharefood | " + title} />
          <PinterestShareButton children={<PinterestIcon size={40} round={true} />} url={url} media={media} description={"Sharefood | " + title} />
          <TelegramShareButton children={<TelegramIcon size={40} round={true} />} url={url} title={"Sharefood | " + title} />
          <TwitterShareButton children={<TwitterIcon size={40} round={true} />} url={url} title={"Sharefood | " + title} />
          <WhatsappShareButton children={<WhatsappIcon size={40} round={true} />} url={url} title={"Sharefood | " + title} />
        </div>
      </div>

      <div className="share__wrapper">
        <h1>{LANG.MISC.COPY}</h1>
        <div className="share__link">
          <p>{url}</p>
          {!copied ? <CopyToClipboard text={url} onCopy={() => setCopied(true)}><CopyAll /></CopyToClipboard> : <Check htmlColor="#09ff00" />}
        </div>
      </div>
    </div>
  )
}

export default Share;