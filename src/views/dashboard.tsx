import { useEffect, useContext } from "react";
import Header from "components/header";
import Sidebar from "components/sidebar";
import Timeline from "components/timeline";
import UserContext from "context/user";
import { useHistory } from "react-router-dom";
import usePhotos from "hooks/use-photos";
import PostContext from "context/post";
import Loading from "components/loading";

export default function Dashboard() {
  const { photos, setUpdate, loading: loadingPhotos } = usePhotos();
  const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    document.title = "Dashboard - Instagram";
  }, [user, history]);

  return (
    <div className="bg-gray-background">
      {loadingPhotos && <Loading />}
      <Header />
      <div className="grid justify-center lg:grid-cols-3 gap-4 lg:justify-between mx-auto max-w-screen-lg px-4">
        <PostContext.Provider value={{ photos, setUpdate }}>
          <Timeline />
          <Sidebar />
        </PostContext.Provider>
      </div>
    </div>
  );
}
