Start designing in grayscale before introducing color, as you’ll be forced to use spacing, contrast, and size to do all of the heavy lifting.

Instead of designing everything up front, work in short cycles.

Don’t imply functionality in your designs that you aren’t ready to build.
If part of a feature is a “nice-to-have”, 

Use a rounded sans serif for a playful look, or else neutral sans serif.
Different colors give the user different feelings, for example blue is safe and calming, while gold or purple may be perceived as luxurious or sophisticated

Same thing applies to border radius, the greater the border radius the more playful/energetic it feels, while no border radius is more old school/formal.

# Systematise everything
The more systems you have in place, the faster you’ll be able to work and the
less you’ll second guess your own decisions.
You’ll want systems for things like:

# Hierarchy is Everything

## Not all elements are equal
Visual hierarchy is used to emphasise certain elements over others without necessarily changing the layout

## Size isn’t everything
Don’t only rely on font size to control the visual hierarchy, that can lead to primary elements that are too large. Try using font weight or color to do the same job.

## Don’t use grey text on colored backgrounds
Grey text on white backgrounds work because it de-emphasises the text due to reduced contrast, instead you should aim to make the text closer to the background color to create hierarchy.
You might try to use opacity instead of a new color, but it can result in dull or washed out text, with the risk that anything on the background can show through as well.
Pick a new color with the same hue, and adjust the saturation and lightness until it looks right.

## The label trap
You often don’t need a label when displaying data, the hierarchy and context should make it obvious to the user.
If you must use labels, try combining the labels and values together. In stock: 12 → 12 in stock. Bedrooms: 3 → 3 bedrooms

## Balancing between weight and constrast
When using text or SVGs with higher weight, you can lower the contrast to create visual balance.
Alternatively, you can also increase the weight to compensate for contrast

## Semantics are secondary
It’s easy to fall into the trap of designing user actions based purely on semantics. As most pages only have one true primary action, only the primary and maybe the secondary actions should have backgrounds and be styled like a button. The rest of the actions can be styled like links.


# Layout and Spacing
One of the easiest ways to clean up a design is to simply give every element a little more room to breathe.
A good approach is to give an element way too much white space, and then remove it until satisfied.

## Dense UIs have a purpose
While open UIs usually feel cleaner and simpler, there are scenarios in which a dense UI layout would be more advantageous. The point here is that dense layouts should be a deliberate decision instead of being the default.

If you want your system to make sizing decisions easy, make sure no two values in your scale are ever closer than about 25%.

## Shrink the canvas
A lot of the time it’s easier to design something small when the constraints are real.
If you’re building a responsive web application, try starting with a ~400px canvas and designing the mobile layout first. Odds are you won’t have to change much when bringing the same design over to the desktop version.

## Avoid ambiguous spacing
When groups of elements are explicitly separated — usually by a border or background color — it’s obvious which elements belong to which group.

## Ignore typefaces with less than five weights


## Keep your line length in check

For the best reading experience, make your paragraphs wide enough to fit between 45 and 75 characters per line. The easiest way to do this on the web is using 
Going a bit wider than 75 characters per line can sometimes work too, but be aware that you’re entering risky territory — stick to the 45-75 range if you want to play it safe.

## Line height is proportional
Line-height and font size are 
## Right-align numbers
If you’re designing a table that includes numbers, right-align them.

As a general rule, you should trust the typeface designer and leave letter-spacing alone.

# Working with color
## Ditch hex for HSL
Using hex or RGB, colors that have a lot in common visually look nothing alike in code.
HSL fixes this by representing colors using attributes the human-eye
intuitively perceives: 
Hue 

## You need more colors than you think
## Greys
Text, backgrounds, panels, form controls — almost everything in an interface
is grey.
You’ll need more greys than you think, too — three or four shades might
sound like plenty but it won’t be long before you wish you had something a
little darker than shade #2 but a little lighter than shade #3.
In practice, you want 8-10 shades to choose from.
## Primary colors
Just like the greys, you ideally want to have 5-10 of lighter and darker shades of the primary color to choose from.
## Accent colors
Sites also need a few accent colors for communicating different things to the user
## Define your shades up front
