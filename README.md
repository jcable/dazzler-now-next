# Dazzler Now/Next

This is a demo website of a simple React based 16:9 TV overlay using HTML5 graphics.

## Page Layout

The page is laid out into three vertical segments, top middle and bottom.

The top segment is subdivided horizontally into left, middle and right.

Left and right segments have optional demonstration graphical elements.

The middle segment is currently unused.

The bottom segment is a single, full width item with now/next data.

## Customisation using url parameters

### DoG customisation

The left and right DoG items are disabled by default. Enable them with tl=yes and/or tr=yes url parameters.

### Now/Next customisation

The Now/Next feature can be configured with the following url parameters:

- sid specifies the channel to retrieve data from. if not present, no Now/Next information will be shown
- env can be 'test' or 'live', defaults to 'live'
- region the AWS region the channel is running in, defaults to eu-west-1
- minDuration is the minimum duration of a programme to be included in the now next display.
- previewMinutes is the time before the start of the next programme when the next display will start to be shown

## Further customisation

The file App.js contains all the logic for the programme. It can be modified to change the styling of the Now/Next information or the DoG urls or any element of the page.