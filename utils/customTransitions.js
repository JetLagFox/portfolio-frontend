export default function customTransitions() {
  console.log("me he cargado");

  if (typeof window !== "undefined") {
    console.log(window);

    window.addEventListener("popstate", function (event) {
      console.log(event.destination.url);
    });

    // window.navigation.addEventListener("navigate", (event) => {
    //   const toUrl = new URL(event.destination.url);

    //   event.intercept({
    //     async handler() {
    //       const response = await fetch(toUrl.pathname);
    //       const text = await response.text();

    //       console.log("text", text);
    //     },
    //   });
    // });
  }
}
