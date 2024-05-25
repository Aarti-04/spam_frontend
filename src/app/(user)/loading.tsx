// import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";

import Loader from "@/components/Loader";

// import styles from "./loading.module.css";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <Loader open={true} />
    </>
  );
}
