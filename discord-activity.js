/* EMS Academy Discord Activity bridge; re-published to trigger GitHub Pages. */
/**
 * EMS Academy Discord Activity bridge.
 * Uses only Discord's Embedded App SDK handshake; no user profile, answers,
 * tokens, or results are stored or sent to a server.
 */
import { DiscordSDK } from "https://esm.sh/@discord/embedded-app-sdk@2.5.0";

const CLIENT_ID = "1561726847803461762";
const status = document.querySelector(".top-status");

async function connectDiscordActivity() {
  if (!window.location.ancestorOrigins?.length && window.parent === window) {
    if (status) status.title = "Предпросмотр сайта вне Discord";
    return;
  }

  try {
    const discordSdk = new DiscordSDK(CLIENT_ID);
    await discordSdk.ready();
    document.documentElement.classList.add("discord-activity-ready");
    if (status) {
      status.innerHTML = '<span class="status-dot"></span> Discord • подключено';
      status.title = "EMS Academy подключена к Discord";
    }
  } catch (error) {
    console.info("[EMS Academy] Discord SDK handshake not available in this context.", error);
    if (status) status.title = "Режим сайта; соединение SDK не подтверждено";
  }
}

connectDiscordActivity();
