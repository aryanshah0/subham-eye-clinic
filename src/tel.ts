// Phone links on a computer. A phone or tablet opens its dialler (untouched here); a Mac would offer FaceTime and Windows some
// other app, which no visitor wants. So without a touch screen, a click copies the number and says so in a floating message.
import { SITE, type Lang } from "./content/site";
import { UI } from "./content/ui";

export function telOnComputers() {
  const computer = () => navigator.maxTouchPoints === 0 && matchMedia("(hover: hover) and (pointer: fine)").matches;
  let box: HTMLElement | undefined, timer = 0;
  document.addEventListener("click", async (e) => {
    const a = (e.target as Element).closest?.('a[href^="tel:"]');
    if (!a || !computer()) return;
    e.preventDefault();
    const L = UI[(document.documentElement.lang === "gu" ? "gu" : "en") as Lang];
    const copied = await (navigator.clipboard?.writeText(SITE.phone) ?? Promise.reject()).then(() => true, () => false);
    if (!box) {
      box = document.createElement("div");
      box.className = "toast";
      box.setAttribute("role", "status");
      document.body.append(box);
    }
    const num = document.createElement("b");
    num.textContent = SITE.phone;
    box.replaceChildren(num, (copied ? L.telCopied : L.telShow));
    box.classList.add("on");
    clearTimeout(timer);
    timer = window.setTimeout(() => box!.classList.remove("on"), 4000);
  });
}
