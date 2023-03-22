import { type ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

const MyPageLayout = ({ children } : Props ) => {
  return (
    <div>
      <style jsx global>{`
        body {
          overflow: hidden;
        }
      `}</style>
      {children}
    </div>
  );
};

export default MyPageLayout;
