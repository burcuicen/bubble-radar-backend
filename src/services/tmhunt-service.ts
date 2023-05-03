import fetch from "node-fetch";

export async function getTmHuntData(text: string) {
  const result = await fetch("http://tmhunt.com/ngrams.php", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9,tr;q=0.8",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "x-requested-with": "XMLHttpRequest",
      Referer: "http://tmhunt.com/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: `query=${text}`,
    method: "POST",
  });
  const responseJson = await result.json();
  return responseJson;
}

