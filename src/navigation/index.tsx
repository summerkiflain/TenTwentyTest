import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStaticNavigation, StaticParamList } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { initialWindowMetrics } from 'react-native-safe-area-context'
// import { Platform } from 'react-native'

import { Dashboard } from './screens/Dashboard'
import { NotFound } from './screens/NotFound'
import { Watch } from './screens/Watch'
import { Search } from './screens/Search'
import { MediaLibrary } from './screens/MediaLibrary'
import { More } from './screens/More'

import { HapticTab } from '@/components/HapticTab'
import { Colors } from '@/constants/Colors'

import DashboardIcon from '../assets/svgs/dashboardIcon.svg'
import WatchIcon from '../assets/svgs/watchIcon.svg'
import MediaLibraryIcon from '../assets/svgs/mediaLibraryIcon.svg'
import MoreIcon from '../assets/svgs/moreIcon.svg'

const HomeTabs = createBottomTabNavigator({
  screens: {
    Dashboard: {
      screen: Dashboard,
      options: {
        headerShown: false,
        tabBarIcon: ({ color }) => <DashboardIcon width={16} height={16} fill={color} />,
      },
    },
    Watch: {
      screen: Watch,
      options: {
        headerShown: false,
        tabBarIcon: ({ color }) => <WatchIcon width={16} height={16} fill={color} />,
      },
    },
    'Media Library': {
      screen: MediaLibrary,
      options: {
        headerShown: false,
        tabBarIcon: ({ color }) => <MediaLibraryIcon width={16} height={16} fill={color} />,
      },
    },
    More: {
      screen: More,
      options: {
        headerShown: false,
        tabBarIcon: ({ color }) => <MoreIcon width={16} height={16} fill={color} />,
      },
    },
  },
  screenOptions: {
    headerShown: false,
    tabBarButton: HapticTab,
    tabBarStyle: {
      backgroundColor: Colors.dark.black,
      paddingTop: 17,
      paddingBottom: 17,
      borderTopLeftRadius: 27,
      borderTopRightRadius: 27,
      overflow: 'hidden',
      borderTopWidth: 0,
      height: 75 + (initialWindowMetrics?.insets?.bottom ?? 0),
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
    Search: {
      screen: Search,
      options: {
        headerShown: false,
      },
      params: {} as { data: { genres: any[]; searchResults: any[] } },
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
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}
