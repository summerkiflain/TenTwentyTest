import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStaticNavigation, StaticParamList } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { Platform } from 'react-native'

import { Explore } from './screens/Explore'
import { Home } from './screens/Home'
import { NotFound } from './screens/NotFound'

import { HapticTab } from '@/components/HapticTab'
// import { IconSymbol } from '@/components/ui/IconSymbol'
// import TabBarBackground from '@/components/ui/TabBarBackground'
import { Colors } from '@/constants/Colors'

import DashboardIcon from '../assets/svgs/dashboardIcon.svg'
import WatchIcon from '../assets/svgs/watchIcon.svg'
import MediaLibraryIcon from '../assets/svgs/mediaLibraryIcon.svg'
import MoreIcon from '../assets/svgs/moreIcon.svg'

const HomeTabs = createBottomTabNavigator({
  screens: {
    Dashboard: {
      screen: Home,
      options: {
        headerShown: false,
        tabBarIcon: ({ color }) => <DashboardIcon width={16} height={16} fill={color} />,
      },
    },
    Watch: {
      screen: Explore,
      options: {
        headerShown: false,
        tabBarIcon: ({ color }) => <WatchIcon width={16} height={16} fill={color} />,
      },
    },
    'Media Library': {
      screen: Explore,
      options: {
        headerShown: false,
        tabBarIcon: ({ color }) => <MediaLibraryIcon width={16} height={16} fill={color} />,
      },
    },
    More: {
      screen: Explore,
      options: {
        headerShown: false,
        tabBarIcon: ({ color }) => <MoreIcon width={16} height={16} fill={color} />,
      },
    },
  },
  screenOptions: {
    headerShown: false,
    tabBarButton: HapticTab,
    // tabBarBackground: TabBarBackground,
    tabBarStyle: {
      backgroundColor: Colors.dark.black,
      paddingTop: 17,
      paddingBottom: 17,
      borderTopLeftRadius: 27,
      borderTopRightRadius: 27,
      overflow: 'hidden',
      borderTopWidth: 0,
      height: 90,
    },
    tabBarLabelStyle: {
      fontFamily: 'Poppins-Regular',
      fontSize: 10,
    },
  },
})

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        headerShown: false,
      },
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },
  },
})

export const Navigation = createStaticNavigation(RootStack)

type RootStackParamList = StaticParamList<typeof RootStack>

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
