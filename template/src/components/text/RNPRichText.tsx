import React, {ReactNode, useCallback, useEffect, useState} from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {parseDocument, DomUtils} from 'htmlparser2';
import RNPText from './RNPText';
import appStyles from '../../styles/styles';

export interface RNPRichTextProps {
  text: string;
  textStyle: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  numberOfLines?: number;
  readMoreButton: () => ReactNode;
}

export default function RNPRichText(props: RNPRichTextProps) {
  const {text, numberOfLines, textStyle, style, readMoreButton} = props;
  const [textHeight, setTextHeight] = useState<number | null>(null);
  const [showMore, setShowMore] = useState(false);
  const isIOS = Platform.OS === 'ios';
  const [maxHeight, setMaxHeight] = useState<number | null>(null);

  useEffect(() => {
    if (numberOfLines && textStyle) {
      const resolvedStyle = StyleSheet.flatten(textStyle); // Ensure it's a resolved object
      if (resolvedStyle) {
        const lineHeight =
          resolvedStyle.lineHeight ?? resolvedStyle.fontSize ?? 0;
        setMaxHeight(numberOfLines * lineHeight);
      } else {
        setMaxHeight(null);
      }
    }
  }, [numberOfLines, textStyle]);

  const onTextLayout = useCallback(
    (e: {nativeEvent: {lines: string | any[]}}) => {
      if (numberOfLines) {
        setShowMore(e.nativeEvent.lines.length > numberOfLines);
      } else {
        setShowMore(false);
      }
    },
    [numberOfLines],
  );

  function applyStyles(tagName: string, elementStyles: any) {
    let updatedStyles = {...elementStyles};

    if (tagName === 'b' || tagName === 'strong') {
      updatedStyles.fontWeight = 'bold';
      if (updatedStyles.fontStyle === 'italic') {
        updatedStyles.fontFamily = 'PlusJakartaSans-BoldItalic';
      } else {
        updatedStyles.fontFamily = 'PlusJakartaSans-Bold';
      }
    }

    if (tagName === 'i' || tagName === 'em') {
      updatedStyles.fontStyle = 'italic';
      if (updatedStyles.fontWeight === 'bold') {
        updatedStyles.fontFamily = 'PlusJakartaSans-BoldItalic';
      } else {
        updatedStyles.fontFamily = 'PlusJakartaSans-Italic';
      }
    }

    if (tagName === 'u') {
      updatedStyles.textDecorationLine = 'underline';
    }

    if (tagName === 's') {
      updatedStyles.textDecorationLine = 'line-through';
    }

    return updatedStyles;
  }

  function renderElement(
    element: any,
    accumulatedStyles: any = {},
    index: any,
  ): ReactNode {
    const tagName = element.name;
    const currentStyles = applyStyles(tagName, accumulatedStyles);

    if (element.type === 'text') {
      return (
        <RNPText key={index} style={currentStyles}>
          {element.data}
        </RNPText>
      );
    }

    if (tagName === 'br') {
      return (
        <RNPText key={index} style={currentStyles}>
          {'\n'}
        </RNPText>
      );
    }

    if (tagName === 'p') {
      return (
        <RNPText key={index} style={[currentStyles, appStyles.marginTop8]}>
          {DomUtils.getChildren(element).map((child, childIndex) =>
            renderElement(child, currentStyles, `${index}-${childIndex}`),
          )}
        </RNPText>
      );
    }

    const children = DomUtils.getChildren(element);

    return children.map((child, childIndex) =>
      renderElement(child, currentStyles, `${index}-${childIndex}`),
    );
  }

  function buildTextComponents() {
    // Replace non-breaking spaces (&nbsp;) with regular spaces
    const normalizedText = text.replace(/&nbsp;/g, ' ');

    // Remove redundant <br/> tags (consecutive or trailing inside <p> tags)
    let cleanedText = normalizedText
      .replace(/<br\/>\s*(<br\/>)+/g, '<br/>') // Collapse consecutive <br/> tags
      .replace(/<p>\s*<br\/>/g, '<p>') // Remove <br/> directly after <p>
      .replace(/<br\/>\s*<\/p>/g, '</p>'); // Remove <br/> before </p>

    // Add a single <br/> only if there isn't one already after </p>
    const preprocessedText = cleanedText.replace(
      /<\/p>(?!\s*<br\/>)/g,
      '</p><br/>',
    );

    // Parse the processed text
    const document = parseDocument(preprocessedText);
    const elements = DomUtils.getChildren(document);

    return elements.map((element, index) => renderElement(element, {}, index));
  }

  return isIOS ? (
    <View style={style}>
      <RNPText
        onLayout={event => {
          const {height} = event.nativeEvent.layout;
          setTextHeight(height);
        }}
        numberOfLines={numberOfLines}
        style={textStyle}>
        {buildTextComponents()}
      </RNPText>
      {textHeight !== null &&
        maxHeight !== null &&
        textHeight > maxHeight &&
        readMoreButton()}
    </View>
  ) : (
    <View style={style}>
      <RNPText
        style={textStyle}
        numberOfLines={numberOfLines}
        onTextLayout={onTextLayout}>
        {buildTextComponents()}
      </RNPText>
      {showMore && readMoreButton()}
    </View>
  );
}
