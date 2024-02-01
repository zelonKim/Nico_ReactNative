import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Movies from '../screens/Movies';
import Tv from '../screens/Tv';
import Search from '../screens/Search';
import { useColorScheme } from 'react-native';
import { YELLOW_COLOR } from './color';
import {Ionicons} from "@expo/vector-icons";

/* 
const Tab = createBottomTabNavigator();

// Tab.Navigator 컴포넌트의 initialRouteName 속성을 통해 초기 시작 탭을 설정할 수 있음.
const Tabs = () => (
    <Tab.Navigator initialRouteName='Search'> 
        <Tab.Screen name="Movies" component={Movies} />
        <Tab.Screen name="Tv" component={Tv} />
        <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
)

export default Tabs;
 */


//////////////////////


/* 
const Tab = createBottomTabNavigator();

// Tab.Navigator 컴포넌트의 screenOptions 속성을 통해 전체 탭에 스타일을 지정해줄 수 있음.

const Tabs = () => (
    <Tab.Navigator screenOptions={{tabBarLabelStyle: { backgroundColor: "red" }}}> 
        <Tab.Screen name="Movies" component={Movies} />
        <Tab.Screen name="Tv" component={Tv} />
        <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
)

export default Tabs; 
*/


///////////////////


/*
const Tab = createBottomTabNavigator();

// Tab.Screen 컴포넌트의 options 속성을 통해 특정 탭에만 스타일을 지정해줄 수 있음.
const Tabs = () => (
    <Tab.Navigator> 
        <Tab.Screen name="Movies" component={Movies} />
        <Tab.Screen name="Tv" component={Tv} options={{tabBarLabelStyle: { backgroundColor: "purple"}}}/>
        <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
)

export default Tabs;
*/


/////////////////



/*
const Tab = createBottomTabNavigator();


const Tabs = () => {
    // const colorScheme = useColorScheme(); // returns the user`s mode (dark or light)
    // console.log(colorScheme); // dark

    const isDark = useColorScheme() === "dark";

    return (
        <Tab.Navigator 
        screenOptions={{
            tabBarStyle: {backgroundColor: isDark ? BLACK_COLOR : "white"},
            tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
            tabBarInactiveTintColor: isDark ? "gray" : "green",
            headerStyle: {
                backgroundColor:  isDark ? BLACK_COLOR : "white"
            },
            headerTitleStyle: {
                color: isDark ? "yellow" : BLACK_COLOR
            }
        }}
    > 
            <Tab.Screen name="Movies" component={Movies} />
            <Tab.Screen name="Tv" component={Tv} />
            <Tab.Screen name="Search" component={Search} />
        </Tab.Navigator>
    )
}
export default Tabs;
*/

//////////////////


const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator 
        screenOptions={{
            tabBarStyle: {backgroundColor: isDark ? BLACK_COLOR : "white"},
            tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
            tabBarInactiveTintColor: isDark ? "gray" : "green",
            headerStyle: {
                backgroundColor:  isDark ? BLACK_COLOR : "white"
            },
            headerTitleStyle: {
                color: isDark ? "yellow" : BLACK_COLOR
            },
            tabBarLabelStyle: {
                marginTop: -5,
                fontSize: 12,
                fontWeight: "600",
            }
        }}
        > 
            <Tab.Screen 
                name="Movies" 
                component={Movies} 
                options={{tabBarIcon:({focused, color, size}) => {
                    console.log(focused, color, size);
                    return <Ionicons name={focused ? "film" : "film-outline"} color={color} size={size} />
                }
            }}/>
            <Tab.Screen 
                name="TV" 
                component={Tv} 
                options={{tabBarIcon:({focused, color, size}) => {
                    console.log(focused, color, size);
                    return <Ionicons name={focused ? "tv" : "tv-outline"} color={color} size={size} />
                }
            }}/>
            <Tab.Screen 
                name="Search"
                component={Search}
                options={{tabBarIcon:({focused, color, size}) => {
                    console.log(focused, color, size);
                    return <Ionicons name={focused ? "search" : "search-outline"} color={color} size={size} />
                }
            }}/>
        </Tab.Navigator>
    )
}
export default Tabs;