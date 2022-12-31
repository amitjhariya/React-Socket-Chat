import ContentLoader from "react-content-loader";
export const GroupsLoader = (props) => {
  return [..."124567890"].map((item, i) => (
    <ContentLoader
      speed={2}
      key={i}
      height={60}
      className="loader-item"
      viewBox="0 0 400 60"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="80" y="10" rx="3" ry="3" width="88" height="6" />
      <rect x="80" y="30" rx="3" ry="3" width="52" height="6" />
      <rect x="20" y="50" rx="3" ry="3" width="410" height="2" />
      <circle y="20" cx="40" cy="24" r="24" />
    </ContentLoader>
  ));
};
