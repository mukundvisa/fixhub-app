"use client";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="container mx-auto bg-black dark:bg-white rounded-full shadow m-4">
      <div className="w-full mx-auto max-w-screen-xl p-4 text-center">
        <span className="text-sm text-body  font-bold text-white dark:text-black">
          © {currentYear} Akshar FixHub. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
