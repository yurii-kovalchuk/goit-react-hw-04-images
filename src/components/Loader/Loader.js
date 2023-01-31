import { MutatingDots } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <MutatingDots
      height="100"
      width="100"
      color="#add5ff"
      secondaryColor="#cdcd00"
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{ justifyContent: 'center' }}
      wrapperClass=""
      visible={true}
    />
  );
};
