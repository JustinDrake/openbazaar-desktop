import $ from 'jquery';
import app from '../app';
import { formatCurrency, convertAndFormatCurrency } from './currency';
import {
  isHiRez, isLargeWidth, isSmallHeight, getAvatarBgImage, getListingBgImage,
} from './responsive';
import { upToFixed } from './number';
import twemoji from 'twemoji';
import {
  splitIntoRows, getBlockChainBaseUrl, getBlockChainTxUrl, getBlockChainAddressUrl,
} from './';
import is from 'is_js';

export function polyT(...args) {
  return app.polyglot.t(...args);
}

export function parseEmojis(text, className = '', attrs = {}) {
  const parsed = twemoji.parse(text,
    icon => (`../imgs/emojis/72X72/${icon}.png`));
  const $parsed = $(`<div>${parsed}</div>`);

  $parsed.find('img')
    .each((index, img) => {
      const $img = $(img);
      $img.addClass(`emoji ${className}`);

      Object.keys(attrs)
        .forEach(attr => {
          $img.attr(attr, attrs[attr]);
        });
    });

  return $parsed.html();
}

/**
 * If the average is a number, show the last 2 digits and trim any trailing zeroes.
 * Don't show the count if the count is invalid, x (0) would be inaccurate and confusing.
 * If the average is invalid, don't show anything.
 * @param {number} average - the average rating
 * @param {number} count - the number of ratings
 */
export function formatRating(average, count) {
  const avIsNum = typeof average === 'number';
  const ratingAverage = avIsNum ? parseFloat(average.toFixed(2)) : '';
  const ratingCount = typeof count === 'number' ? ` (${count})` : '';
  return avIsNum ? `${parseEmojis('⭐')} ${ratingAverage}${ratingCount}` : '';
}

export const getServerUrl = app.getServerUrl.bind(app);

export {
  formatCurrency,
  convertAndFormatCurrency,
  isHiRez,
  isLargeWidth,
  isSmallHeight,
  getAvatarBgImage,
  getListingBgImage,
  upToFixed,
  splitIntoRows,
  getBlockChainBaseUrl,
  getBlockChainTxUrl,
  getBlockChainAddressUrl,
  is,
};
