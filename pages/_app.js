import AdminContext from "./../context/AdminContext";

function MyApp({ Component, pageProps }) {
  return (
    <AdminContext>
      <Component {...pageProps} />
    </AdminContext>
  );
}

export default MyApp;
