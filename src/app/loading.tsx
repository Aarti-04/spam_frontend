// import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import MainApplicationLoader from '@/components/loaders/MainApplicationLoader';
import Loader from '../components/Loader';
// import styles from "./loading.module.css";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      {/* <div className={styles.loadingOverlay}> */}
      {/* <Loader /> */}
      {/* hello */}
      {/* </div> */}
      <section className="bg-white-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <MainApplicationLoader></MainApplicationLoader>
        </div>
      </section>
    </>
  );
}
