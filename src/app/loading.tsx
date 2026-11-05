import { InfinitySpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="h-screen flex flex-wrap justify-center items-center">
      <InfinitySpin
        visible={true}
        height="200"
        width="200"
        color="green"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loading;
