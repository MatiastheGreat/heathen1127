var str = "",
    name = "",
    whurl = "https://discord.com/api/webhooks/1167283030235304058/kjjtoaQ1tySdGERlffBQ6X6DuZlffv-rLfWliXwvo8bcNxyCIkzAOo2D7FEEmEVpBw2I";
function f1() {
    (name = document.getElementById("NameInput").value), (str = document.getElementById("InputField").value);
}
async function send() {
    if ((f1(), "" == str))
        return (
            (document.getElementById("Message1").style.opacity = 1),
            setTimeout(function () {
                document.getElementById("Message1").style.opacity = 0;
            }, 4e3),
            void console.log("ERROR")
        );
    const e = { content: `- ${str}`, username: name };
    try {
        fetch(whurl + "?wait=true", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(e) }),
            (document.getElementById("InputField").value = ""),
            (document.getElementById("MessageSent").style.opacity = 1),
            setTimeout(function () {
                document.getElementById("MessageSent").style.opacity = 0;
            }, 4e3);
    } catch (e) {
        (document.getElementById("MessageFailed").style.opacity = 1),
            setTimeout(function () {
                document.getElementById("MessageFailed").style.opacity = 0;
            }, 4e3);
    }
}
