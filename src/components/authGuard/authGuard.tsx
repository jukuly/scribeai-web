export default function({ isSignedIn, children }: { isSignedIn: boolean, children: any }) {
  if (!isSignedIn) {
    return <></>;
  }
  return children;
};