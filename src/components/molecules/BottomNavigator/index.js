import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {TabItem} from '../../atoms';
import {colors} from '../../../utils';

export default function BottomNavigator({state, descriptors, navigation}) {
  return (
    <View style={styles.page}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          //   <TouchableOpacity
          //     accessibilityRole="button"
          //     accessibilityState={isFocused ? {selected: true} : {}}
          //     accessibilityLabel={options.tabBarAccessibilityLabel}
          //     testID={options.tabBarTestID}
          //     onPress={onPress}
          //     onLongPress={onLongPress}
          //     style={styles.buttonNavigation}>
          //     <Text style={styles.textButton(isFocused)}>{label}</Text>
          //   </TouchableOpacity>
          <TabItem title={label} />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 53,
    paddingVertical: 12,
    backgroundColor: colors.secondary,
  },
  buttonNavigation: {
    flex: 1,
  },
  textButton: isFocused => ({
    color: isFocused ? '#673ab7' : '#222',
  }),
});
