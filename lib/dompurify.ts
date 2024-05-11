// lib/dompurify.js
import DOMPurify from "dompurify";

const sanitizeHtml = (html: any) => {
  return DOMPurify.sanitize(html);
};

export default sanitizeHtml;
