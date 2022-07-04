import React from "react";

import Card from "../../components/Card";

import './styles.scss';

const HomePage: React.FC = () => {
  const data = [
    {
      id: '1',
      data: {
        username: 'Pabek',
        profilePic: 'https://lh6.googleusercontent.com/-S3D1sw2-6lw/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmQDbLm8_slOlkhcbK4fPLtvlkYOA/s96-c/photo.jpg',
        image: 'https://firebasestorage.googleapis.com/v0/b/pb-sharefood.appspot.com/o/recipeImages%2FUjsXIWZ4EpOD5kvBBPhtCkaZ1Aa2%2FBreakfast%20sandwich%2F1650560888169UjsXIWZ4EpOD5kvBBPhtCkaZ1Aa2Breakfast%20sandwichJPEG_HIGH?alt=media&token=b09de19b-c66b-468a-a8e2-b4d196861e7a',
        timestamp: "",
        title: 'Crème brûlée',
        type: 'breakfast',
      }
    },
    {
      id: '2',
      data: {
        username: 'Pabek',
        profilePic: 'https://lh6.googleusercontent.com/-S3D1sw2-6lw/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmQDbLm8_slOlkhcbK4fPLtvlkYOA/s96-c/photo.jpg',
        image: 'https://firebasestorage.googleapis.com/v0/b/pb-sharefood.appspot.com/o/recipeImages%2FUjsXIWZ4EpOD5kvBBPhtCkaZ1Aa2%2FBreakfast%20sandwich%2F1650560888169UjsXIWZ4EpOD5kvBBPhtCkaZ1Aa2Breakfast%20sandwichJPEG_HIGH?alt=media&token=b09de19b-c66b-468a-a8e2-b4d196861e7a',
        timestamp: "",
        title: 'Crème brûlée',
        type: 'breakfast',
      }
    },
    {
      id: '3',
      data: {
        username: 'Pabek',
        profilePic: 'https://lh6.googleusercontent.com/-S3D1sw2-6lw/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmQDbLm8_slOlkhcbK4fPLtvlkYOA/s96-c/photo.jpg',
        image: 'https://firebasestorage.googleapis.com/v0/b/pb-sharefood.appspot.com/o/recipeImages%2FUjsXIWZ4EpOD5kvBBPhtCkaZ1Aa2%2FBreakfast%20sandwich%2F1650560888169UjsXIWZ4EpOD5kvBBPhtCkaZ1Aa2Breakfast%20sandwichJPEG_HIGH?alt=media&token=b09de19b-c66b-468a-a8e2-b4d196861e7a',
        timestamp: "",
        title: 'Crème brûlée',
        type: 'breakfast',
      }
    },
    {
      id: '4',
      data: {
        username: 'Pabek',
        profilePic: 'https://lh6.googleusercontent.com/-S3D1sw2-6lw/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmQDbLm8_slOlkhcbK4fPLtvlkYOA/s96-c/photo.jpg',
        image: 'https://firebasestorage.googleapis.com/v0/b/pb-sharefood.appspot.com/o/recipeImages%2FUjsXIWZ4EpOD5kvBBPhtCkaZ1Aa2%2FBreakfast%20sandwich%2F1650560888169UjsXIWZ4EpOD5kvBBPhtCkaZ1Aa2Breakfast%20sandwichJPEG_HIGH?alt=media&token=b09de19b-c66b-468a-a8e2-b4d196861e7a',
        timestamp: "",
        title: 'Crème brûlée',
        type: 'breakfast',
      }
    },
    {
      id: '5',
      data: {
        username: 'Pabek',
        profilePic: 'https://lh6.googleusercontent.com/-S3D1sw2-6lw/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmQDbLm8_slOlkhcbK4fPLtvlkYOA/s96-c/photo.jpg',
        image: 'https://firebasestorage.googleapis.com/v0/b/pb-sharefood.appspot.com/o/recipeImages%2FUjsXIWZ4EpOD5kvBBPhtCkaZ1Aa2%2FBreakfast%20sandwich%2F1650560888169UjsXIWZ4EpOD5kvBBPhtCkaZ1Aa2Breakfast%20sandwichJPEG_HIGH?alt=media&token=b09de19b-c66b-468a-a8e2-b4d196861e7a',
        timestamp: "",
        title: 'Crème brûlée',
        type: 'breakfast',
      }
    },
  ]


  return (
    <div className="homepage">

      <div className="homepage__container">
        <div className="banner">
          <h2>Currently in season</h2>
          <div className="banner__wrapper">
            <div className="banner__img">
              <img src="https://cdn.pixabay.com/photo/2017/11/18/17/09/strawberries-2960533_960_720.jpg" alt="strawberries" />
              <p>Strawberry</p>
            </div>
            <div className="banner__img">
              <img src="https://cdn.pixabay.com/photo/2018/03/17/21/04/fruit-3235152_960_720.jpg" alt="Wild cherry" />
              <p>Wild cherry</p>
            </div>
          </div>
        </div>

        <div className="window">
          <h2>Recent recipes</h2>

          <div className="divRecipes">
            {data?.map(({ id, data }) => (
              <Card
                key={id}
                id={id}
                username={data?.username}
                profilePic={data?.profilePic}
                image={data?.image}
                timestamp={data?.timestamp}
                title={data?.title}
                type={data?.type}
              />
            ))}
          </div>
        </div>

        <div className="window"><h2>Most popular</h2>

          <div className="divRecipes">
            {data?.map(({ id, data }) => (
              <Card
                key={id}
                id={id}
                username={data?.username}
                profilePic={data?.profilePic}
                image={data?.image}
                timestamp={data?.timestamp}
                title={data?.title}
                type={data?.type}
              />
            ))}
          </div></div>

        <div className="window"><h2>Recently viewed</h2>
          <div className="divRecipes">
            {data?.map(({ id, data }) => (
              <Card
                key={id}
                id={id}
                username={data?.username}
                profilePic={data?.profilePic}
                image={data?.image}
                timestamp={data?.timestamp}
                title={data?.title}
                type={data?.type}
              />
            ))}
          </div>
        </div>

        <div className="topUsers">
          <div className="users">
            <h2>TOP (summarized likes on all recipes)</h2>
            <div className="usersProfiles">
              <div className="userProfile">
                <img src={data[0].data?.profilePic} alt="" />
                <h3>Pabek</h3>
              </div>
              <div className="userProfile">
                <img src={data[0].data?.profilePic} alt="" />
                <h3>Pabek</h3>
              </div>
              <div className="userProfile">
                <img src={data[0].data?.profilePic} alt="" />
                <h3>Pabek</h3>
              </div>
              <div className="userProfile">
                <img src={data[0].data?.profilePic} alt="" />
                <h3>Pabek</h3>
              </div>
              <div className="userProfile">
                <img src={data[0].data?.profilePic} alt="" />
                <h3>Pabek</h3>
              </div>
            </div>
          </div>

          <div className="users">
            {/* likes comments added recipes */}
            <h2>MOST ACTIVE (L+C+AR)</h2>
            <div className="usersProfiles">
              <div className="userProfile">
                <img src={data[0].data?.profilePic} alt="" />
                <h3>Pabek</h3>
              </div>
              <div className="userProfile">
                <img src={data[0].data?.profilePic} alt="" />
                <h3>Pabek</h3>
              </div>
              <div className="userProfile">
                <img src={data[0].data?.profilePic} alt="" />
                <h3>Pabek</h3>
              </div>
              <div className="userProfile">
                <img src={data[0].data?.profilePic} alt="" />
                <h3>Pabek</h3>
              </div>
              <div className="userProfile">
                <img src={data[0].data?.profilePic} alt="" />
                <h3>Pabek</h3>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div>
  );
};

export default HomePage;
