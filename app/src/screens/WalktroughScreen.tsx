import {View} from 'react-native';
import {useEffect, useState} from 'react';
import React from 'react';
import Footer from '../components/Footer';
import Carousel, {ICarouselInstance} from "react-native-reanimated-carousel";
import {Dimensions} from 'react-native';
import {WalkthroughCard} from "../components/cards/WalkthroughCard";
import RoundButton from "../components/buttons/RoundButton";
import {Colors, Spacing} from "../assets/Stylesheet";
import {useUser} from "../utils/contexts/UserContext";
import useInitialURL from "../utils/hooks/UseInitialUrl";

const WalktroughScreen = ({navigation}: any) => {
    useInitialURL(navigation);
    const {user} = useUser();
    const [data] = useState([...new Array(3).keys()]);
    const [index, setIndex] = useState<number>(0);
    const items = [
        {
            icon: 'hand-clap',
            title: 'Welcome',
            description: 'Welcome to this lovely app that is been programmed for this vacation'
        },
        {
            icon: 'heart',
            title: 'Concept',
            description: 'This app will be used for administrative services. When somebody kisses or fucks someone he or she will receive points by the admin.'
        },
        {
            icon: 'trophy',
            title: 'May the best win',
            description: 'Get money, fuck bitches or die tryin'
        }
    ];
    const carouselRef = React.useRef<ICarouselInstance>(null);

    useEffect(() => {
    }, []);

    const goToRegistration = () => {
        if(user){
            navigation.navigate({
                name: 'Home'
            });
            return;
        }
        navigation.navigate({
            name: 'Registration',
        });
    };

    const scrollTo = (index: number) => {
        setIndex(index);
        carouselRef.current?.scrollTo({index: index, animated: true});
    };

    return (
        <View style={{height: '100%'}}>
            <Carousel
                vertical={false}
                width={Dimensions.get('window').width}
                height={Dimensions.get('window').height}
                ref={carouselRef}
                style={{width: "100%", height: '75%'}}
                loop={false}
                autoPlay={false}
                pagingEnabled={true}
                data={data}
                onSnapToItem={newIndex => {if(newIndex !== index) setIndex(newIndex)}}
                renderItem={({index}: any) => <WalkthroughCard key={index} index={index} icon={items[index].icon}
                                                               title={items[index].title}
                                                               description={items[index].description}
                                                               isLast={index === 2}
                                                               onLast={goToRegistration}/>
                }
            />
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    gap: Spacing.small
                }}>
                <RoundButton
                    size={'small'}
                    colors={index === 0 ? 'primary' : [Colors.lightPurple, Colors.lightPurple]}
                    disabled={index === 0}
                    shadow={index === 0}
                    accessibilityHint={'Go to slide 1'}
                    onPress={() => scrollTo(0)}/>
                <RoundButton
                    size={'small'}
                    colors={index === 1 ? 'primary' : [Colors.lightPurple, Colors.lightPurple]}
                    disabled={index === 1}
                    shadow={index === 1}
                    accessibilityHint={'Go to slide 2'}
                    onPress={() => scrollTo(1)}/>
                <RoundButton
                    size={'small'}
                    colors={index === 2 ? 'primary' : [Colors.lightPurple, Colors.lightPurple]}
                    disabled={index === 2}
                    shadow={index === 2}
                    accessibilityHint={'Go to slide 3'}
                    onPress={() => scrollTo(2)}/>
            </View>
            <Footer start={true}/>
        </View>
    );
};
export default WalktroughScreen;
