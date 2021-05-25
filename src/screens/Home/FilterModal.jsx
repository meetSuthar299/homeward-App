import { FontAwesome5 } from '@expo/vector-icons';
import SegmentedControl from '@react-native-community/segmented-control';
import { useHeaderHeight } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';

import TextButton from '../../components/TextButton';
import TextHW from '../../components/TextHW';
import useData from '../../hooks/useData';
import useTheme from '../../hooks/useTheme';

const SORT_MAP = new Map([
  ['Date', (a, b) => b.date.toMillis() - a.date.toMillis()],
  ['Lost', (a, b) => b.lost - a.lost],
  ['Found', (a, b) => a.lost - b.lost]
]);
const SORT_VALUES = [...SORT_MAP.keys()];

const FILTER_MAP = new Map([
  ['Both', undefined],
  ['Lost', item => item.lost],
  ['Found', item => !item.lost]
]);
const FILTER_VALUES = [...FILTER_MAP.keys()];

const SPECIES = [
  {
    key: 0,
    value: () => true,
    label: 'All Animals'
  },
  {
    key: 1,
    value: e => e.species.toLowerCase() === 'canine',
    label: 'Dogs Only'
  },
  {
    key: 2,
    value: e => e.species.toLowerCase() === 'feline',
    label: 'Cats Only'
  },
  {
    key: 3,
    value: e => e.species.toLowerCase() === 'other',
    label: 'Other'
  }
];

const SectionTitle = ({ text }) => (
  <TextHW
    bold
    style={{
      marginTop: 30,
      fontSize: 16,
      fontWeight: 'bold',
      color: 'gray',
      textTransform: 'uppercase'
    }}
  >
    {text}
  </TextHW>
);

const FilterModal = ({ filterModalVisible, toggleFilterModal }) => {
  const [sortIndex, setSortIndex] = React.useState(0);
  const [prevSortIndex, setPrevSortIndex] = React.useState(0);

  const [filterIndex, setFilterIndex] = React.useState(0);
  const [prevFilterIndex, setPrevFilterIndex] = React.useState(0);

  const [speciesIndex, setSpeciesIndex] = React.useState(0);
  const [prevSpeciesIndex, setPrevSpeciesIndex] = React.useState(0);

  const { filterPosts } = useData();
  const { theme } = useTheme();

  const headerHeight = useHeaderHeight() * 1.5;

  const reset = () => {
    setSortIndex(0);
    setFilterIndex(0);
    setSpeciesIndex(0);
  };

  const abort = () => {
    setSortIndex(prevSortIndex);
    setFilterIndex(prevFilterIndex);
    setSpeciesIndex(prevSpeciesIndex);

    toggleFilterModal();
  };

  const commit = () => {
    const sortValue = SORT_VALUES[sortIndex];
    const sortComparator = SORT_MAP.get(sortValue);
    setPrevSortIndex(sortIndex);

    const filterValue = FILTER_VALUES[filterIndex];
    const filterPredicate = FILTER_MAP.get(filterValue);
    setPrevFilterIndex(filterIndex);

    const speciesPredicate = SPECIES.find(e => e.key === speciesIndex).value;
    setPrevSpeciesIndex(speciesIndex);

    filterPosts(sortComparator, filterPredicate, speciesPredicate);

    toggleFilterModal();
  };

  const SpeciesFilter = () => (
    <RNPickerSelect
      items={SPECIES}
      itemKey={speciesIndex}
      onValueChange={(value, index) => setSpeciesIndex(index)}
      placeholder={{}}
      Icon={() => <FontAwesome5 name='angle-down' size={28} color='gray' />}
      useNativeAndroidPickerStyle={false}
      style={{
        inputIOS: {
          ...styles.select,
          color: theme.backgroundTextColor
        },
        inputAndroid: {
          ...styles.select,
          color: theme.backgroundTextColor
        },
        iconContainer: { top: 40, right: 10 }
      }}
    />
  );

  return (
    <Modal
      style={{ marginHorizontal: 0, marginBottom: 0, marginTop: headerHeight }}
      isVisible={filterModalVisible}
      onBackdropPress={abort}
      onSwipeComplete={abort}
      swipeDirection={['down']}
      swipeThreshold={50}
      propagateSwipe
      animationInTiming={300}
      backdropTransitionOutTiming={300}
      hideModalContentWhileAnimating
    >
      <View
        style={{
          alignSelf: 'center',
          width: '30%',
          padding: 2,
          marginBottom: 10,
          borderRadius: 10,
          backgroundColor: '#d3d3d3'
        }}
      />

      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          backgroundColor: theme.secondaryBackgroundColor
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}
        >
          <FontAwesome5
            name='times'
            size={22}
            color={theme.backgroundTextColor}
            onPress={abort}
          />

          <TextHW style={{ fontSize: 20, color: theme.backgroundTextColor }}>
            Sort and Filter
          </TextHW>

          <TextHW
            style={{ fontSize: 16, color: theme.backgroundTextColor }}
            onPress={reset}
          >
            Reset
          </TextHW>
        </View>

        <SectionTitle text='Sort' />

        <SegmentedControl
          enabled={filterIndex === 0}
          values={SORT_VALUES}
          selectedIndex={sortIndex}
          onChange={e => setSortIndex(e.nativeEvent.selectedSegmentIndex)}
          tintColor={
            theme.isDark ? theme.secondaryColor : theme.secondaryLightColor
          }
          fontStyle={{ color: theme.primaryTextColor }}
          activeFontStyle={{ color: theme.primaryTextColor }}
          style={{
            marginTop: 15,
            borderRadius: 0,
            backgroundColor: theme.secondaryDarkColor
          }}
        />

        <SectionTitle text='Filter' />

        <SegmentedControl
          values={FILTER_VALUES}
          selectedIndex={filterIndex}
          onChange={event => {
            const idx = event.nativeEvent.selectedSegmentIndex;

            if (idx !== 0) {
              setSortIndex(0);
            }

            setFilterIndex(idx);
          }}
          tintColor={
            theme.isDark ? theme.secondaryColor : theme.secondaryLightColor
          }
          fontStyle={{ color: theme.primaryTextColor }}
          activeFontStyle={{ color: theme.primaryTextColor }}
          style={{
            marginTop: 15,
            borderRadius: 0,
            backgroundColor: theme.secondaryDarkColor
          }}
        />

        <SpeciesFilter />

        <TextButton
          text='Apply'
          fontSize={18}
          color={theme.primaryTextColor}
          backgroundColor={theme.secondaryDarkColor}
          onPress={commit}
          style={{ marginTop: 30 }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  select: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingRight: 30,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#aaa',
    fontSize: 16
  }
});

export default React.memo(FilterModal);
