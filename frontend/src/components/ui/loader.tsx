import { DNA } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="fixed bg-black bg-opacity-50 flex justify-center items-center z-100 inset-0">
      <DNA
        visible={true}
        height="100"
        width="100"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};

export default Loader;
