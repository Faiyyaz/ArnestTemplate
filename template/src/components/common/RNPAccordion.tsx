import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {List} from 'react-native-paper';

export interface RNPAccordionProps {
  style?: StyleProp<ViewStyle>;
  data: {
    id: string;
    title: string;
    items: string[];
  }[];
}

export default function RNPAccordion(props: RNPAccordionProps) {
  const {style, data} = props;

  return (
    <View style={style}>
      <List.AccordionGroup>
        {data.map(({id, title, items}) => (
          <List.Accordion key={id} title={title} id={id}>
            {items.map((item, index) => (
              <List.Item key={index} title={item} />
            ))}
          </List.Accordion>
        ))}
      </List.AccordionGroup>
    </View>
  );
}
