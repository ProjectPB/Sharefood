import React from "react";
import "./Main.css";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import { selectSidebarIsOpen } from "../../features/sidebarSlice";
import { Avatar } from "@material-ui/core";

function Main() {
    const sidebarIsOpen = useSelector(selectSidebarIsOpen);

    return (
        <div className="main">
            {sidebarIsOpen ? (
                <div className="cards--wide">
                    <Card
                        wide
                        title="Pyszne Spaghetti z sosem pomidorowym, kurczakiem, krewetkami, rucolą i cukinią"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://image.freepik.com/free-photo/pasta-spaghetti-with-shrimps-sauce_1220-5072.jpg"
                    />
                    <Card
                        wide
                        title="Jakieś śniadanie"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hand-held-bbq-favorites-royalty-free-image-694189032-1564779029.jpg?crop=1.00xw:0.669xh;0,0.0919xh&resize=1200:*"
                    />
                    <Card
                        wide
                        title="Pitca"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://assets.bonappetit.com/photos/597f6564e85ce178131a6475/master/w_1200,c_limit/0817-murray-mancini-dried-tomato-pie.jpg"
                    />
                    <Card
                        wide
                        title="Pyszne Spaghetti z sosem pomidorowym, kurczakiem, krewetkami, rucolą i cukinią"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://image.freepik.com/free-photo/pasta-spaghetti-with-shrimps-sauce_1220-5072.jpg"
                    />
                    <Card
                        wide
                        title="Jakieś śniadanie"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hand-held-bbq-favorites-royalty-free-image-694189032-1564779029.jpg?crop=1.00xw:0.669xh;0,0.0919xh&resize=1200:*"
                    />
                    <Card
                        wide
                        title="Pitca"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://assets.bonappetit.com/photos/597f6564e85ce178131a6475/master/w_1200,c_limit/0817-murray-mancini-dried-tomato-pie.jpg"
                    />
                    <Card
                        wide
                        title="Pyszne Spaghetti z sosem pomidorowym, kurczakiem, krewetkami, rucolą i cukinią"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://image.freepik.com/free-photo/pasta-spaghetti-with-shrimps-sauce_1220-5072.jpg"
                    />
                    <Card
                        wide
                        title="Jakieś śniadanie"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hand-held-bbq-favorites-royalty-free-image-694189032-1564779029.jpg?crop=1.00xw:0.669xh;0,0.0919xh&resize=1200:*"
                    />
                    <Card
                        wide
                        title="Pitca"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://assets.bonappetit.com/photos/597f6564e85ce178131a6475/master/w_1200,c_limit/0817-murray-mancini-dried-tomato-pie.jpg"
                    />
                    <Card
                        wide
                        title="Pyszne Spaghetti z sosem pomidorowym, kurczakiem, krewetkami, rucolą i cukinią"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://image.freepik.com/free-photo/pasta-spaghetti-with-shrimps-sauce_1220-5072.jpg"
                    />
                    <Card
                        wide
                        title="Jakieś śniadanie"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hand-held-bbq-favorites-royalty-free-image-694189032-1564779029.jpg?crop=1.00xw:0.669xh;0,0.0919xh&resize=1200:*"
                    />
                    <Card
                        wide
                        title="Pitca"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://assets.bonappetit.com/photos/597f6564e85ce178131a6475/master/w_1200,c_limit/0817-murray-mancini-dried-tomato-pie.jpg"
                    />
                </div>
            ) : (
                <div className="cards--narrow">
                    <Card
                        title="Pyszne Spaghetti z sosem pomidorowym, kurczakiem, krewetkami, rucolą i cukinią"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://image.freepik.com/free-photo/pasta-spaghetti-with-shrimps-sauce_1220-5072.jpg"
                    />
                    <Card
                        title="Jakieś śniadanie"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hand-held-bbq-favorites-royalty-free-image-694189032-1564779029.jpg?crop=1.00xw:0.669xh;0,0.0919xh&resize=1200:*"
                    />
                    <Card
                        title="Pitca"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://assets.bonappetit.com/photos/597f6564e85ce178131a6475/master/w_1200,c_limit/0817-murray-mancini-dried-tomato-pie.jpg"
                    />
                    <Card
                        title="Pyszne Spaghetti z sosem pomidorowym, kurczakiem, krewetkami, rucolą i cukinią"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://image.freepik.com/free-photo/pasta-spaghetti-with-shrimps-sauce_1220-5072.jpg"
                    />
                    <Card
                        title="Jakieś śniadanie"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hand-held-bbq-favorites-royalty-free-image-694189032-1564779029.jpg?crop=1.00xw:0.669xh;0,0.0919xh&resize=1200:*"
                    />
                    <Card
                        title="Pitca"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://assets.bonappetit.com/photos/597f6564e85ce178131a6475/master/w_1200,c_limit/0817-murray-mancini-dried-tomato-pie.jpg"
                    />
                    <Card
                        title="Pyszne Spaghetti z sosem pomidorowym, kurczakiem, krewetkami, rucolą i cukinią"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://image.freepik.com/free-photo/pasta-spaghetti-with-shrimps-sauce_1220-5072.jpg"
                    />
                    <Card
                        title="Jakieś śniadanie"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hand-held-bbq-favorites-royalty-free-image-694189032-1564779029.jpg?crop=1.00xw:0.669xh;0,0.0919xh&resize=1200:*"
                    />
                    <Card
                        title="Pitca"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://assets.bonappetit.com/photos/597f6564e85ce178131a6475/master/w_1200,c_limit/0817-murray-mancini-dried-tomato-pie.jpg"
                    />
                    <Card
                        title="Pyszne Spaghetti z sosem pomidorowym, kurczakiem, krewetkami, rucolą i cukinią"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://image.freepik.com/free-photo/pasta-spaghetti-with-shrimps-sauce_1220-5072.jpg"
                    />
                    <Card
                        title="Jakieś śniadanie"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hand-held-bbq-favorites-royalty-free-image-694189032-1564779029.jpg?crop=1.00xw:0.669xh;0,0.0919xh&resize=1200:*"
                    />
                    <Card
                        title="Pitca"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://assets.bonappetit.com/photos/597f6564e85ce178131a6475/master/w_1200,c_limit/0817-murray-mancini-dried-tomato-pie.jpg"
                    />
                    <Card
                        title="Pyszne Spaghetti z sosem pomidorowym, kurczakiem, krewetkami, rucolą i cukinią"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://image.freepik.com/free-photo/pasta-spaghetti-with-shrimps-sauce_1220-5072.jpg"
                    />
                    <Card
                        title="Jakieś śniadanie"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hand-held-bbq-favorites-royalty-free-image-694189032-1564779029.jpg?crop=1.00xw:0.669xh;0,0.0919xh&resize=1200:*"
                    />
                    <Card
                        title="Pitca"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://assets.bonappetit.com/photos/597f6564e85ce178131a6475/master/w_1200,c_limit/0817-murray-mancini-dried-tomato-pie.jpg"
                    />
                    <Card
                        title="Pyszne Spaghetti z sosem pomidorowym, kurczakiem, krewetkami, rucolą i cukinią"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://image.freepik.com/free-photo/pasta-spaghetti-with-shrimps-sauce_1220-5072.jpg"
                    />
                    <Card
                        title="Jakieś śniadanie"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hand-held-bbq-favorites-royalty-free-image-694189032-1564779029.jpg?crop=1.00xw:0.669xh;0,0.0919xh&resize=1200:*"
                    />
                    <Card
                        title="Pitca"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://assets.bonappetit.com/photos/597f6564e85ce178131a6475/master/w_1200,c_limit/0817-murray-mancini-dried-tomato-pie.jpg"
                    />
                    <Card
                        title="Pyszne Spaghetti z sosem pomidorowym, kurczakiem, krewetkami, rucolą i cukinią"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://image.freepik.com/free-photo/pasta-spaghetti-with-shrimps-sauce_1220-5072.jpg"
                    />
                    <Card
                        title="Jakieś śniadanie"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hand-held-bbq-favorites-royalty-free-image-694189032-1564779029.jpg?crop=1.00xw:0.669xh;0,0.0919xh&resize=1200:*"
                    />
                    <Card
                        title="Pitca"
                        user="Patryk"
                        UserImage={Avatar}
                        image="https://assets.bonappetit.com/photos/597f6564e85ce178131a6475/master/w_1200,c_limit/0817-murray-mancini-dried-tomato-pie.jpg"
                    />
                </div>
            )}
        </div>
    );
}

export default Main;
