Start designing in grayscale before introducing color, as you’ll be forced to use spacing, contrast, and size to do all of the heavy lifting.

Different colors give the user different feelings, for example blue is safe and calming, while gold or purple may be perceived as luxurious or sophisticated

Don’t imply functionality in your designs that you aren’t ready to build.

Rounded sans serif can be used for a playful look, while neutral is more professional.

Same thing applies to border radius, the greater the border radius the more playful/energetic it feels, while no border radius is more old school/formal.

## Systematise everything

The more systems you have in place, the faster you’ll be able to work and the
less you’ll second guess your own decisions.

## Hierarchy is Everything

### Not all elements are equal

Visual hierarchy is used to emphasise certain elements over others without necessarily changing the layout.

### Size isn’t everything

Don’t only rely on font size to control the visual hierarchy, that can lead to primary elements that are too large. Try using font weight or color to do the same job.

### Don’t use grey text on colored backgrounds

You might try to use opacity instead of a new color, but it can result in dull or washed out text, with the risk that anything on the background can show through as well.

Pick a new color with the same hue, and adjust the saturation and lightness until it looks right.

### The label trap

You often don’t need a label when displaying data, the hierarchy and context should make it obvious to the user.

If you must use labels, try combining the labels and values together. In stock: 12 → 12 in stock. Bedrooms: 3 → 3 bedrooms

### Balancing between weight and contrast

When using text or SVGs with higher weight, you can lower the contrast to create visual balance. Alternatively, you can also increase the weight to compensate for contrast.

### Semantics are secondary

It’s easy to fall into the trap of designing user actions based purely on semantics. As most pages only have one true primary action, only the primary and maybe the secondary actions should have backgrounds and be styled like a button. The rest of the actions can be styled like links.

## Layout and Spacing

One of the easiest ways to clean up a design is to simply give every element a little more room to breathe. A good approach is to start with too much whitespace, and then remove it until satisfied.

### Dense UIs have a purpose

While open UIs usually feel cleaner and simpler, there are scenarios in which a dense UI layout would be more advantageous. The point here is that dense layouts should be a deliberate decision instead of being the default.

### Shrink the canvas

A lot of the time it’s easier to design something small when the constraints are real.

### Avoid ambiguous spacing

When groups of elements are explicitly separated — usually by a border or background color — it’s obvious which elements belong to which group.

### Keep your line length in check

For the best reading experience, make your paragraphs wide enough to fit between 45 and 75 characters per line. The easiest way to do this on the web is using *em* units, which are relative to the current font size. A width of 20-35em will get you in the right ballpark.

### Line height is proportional

Line-height and font size are *inversely* proportional — use a taller line-height
for small text and a shorter line-height for large text.

### **Right-align numbers**

If you’re designing a table that includes numbers, right-align them.

## Working with color

### Ditch hex for HSL

HSL represents colors by using attributes the human-eye intuitively perceives: *hue*, *saturation*, and *lightness*.

**Hue** is a color’s position on the color wheel — it’s the attribute of a color that
lets us identify two colors as “blue” even if they aren’t identical.

### **You need more colors than you think**

### **Greys**

Text, backgrounds, panels, form controls — almost everything in an interface
is grey. In practice, you want 8-10 shades to choose from.

### Primary colors

Just like the greys, you ideally want to have 5-10 of lighter and darker shades of the primary color to choose from.

### Accent colors

Sites also need a few accent colors for communicating different things to the user

### Define your shades up front

1. Choose the base color

1. Pick the darkest and lightest shades

1. Fill in the gaps

### Flipping the contrast

When using white text on a colored background, you’d be surprised how dark the color often needs to be to meet that 4.5:1 contrast ratio. You can solve this problem by *flipping the contrast*. Instead of using light text on a dark colored background, use dark colored text on a light colored background:

## Creating depth

People generally look slightly downward towards their screens, so for the most natural look, reveal a little bit of the top edge and hide the bottom edge.


![0](assets/book_posts/471/0.jpg)

Next, you need to account for the fact that a raised element will block some of the light from reaching the area below the element.


![1](assets/book_posts/471/1.jpg)



### Inset elements


![2](assets/book_posts/471/2.jpg)


![3](assets/book_posts/471/3.jpg)


![4](assets/book_posts/471/4.jpg)

### Combining shadows with interaction

Use both shadows and translations to emulate effects such as drag and drop or a button being pressed.

### Overlap elements to create layers

One of the most effective ways to create depth is to overlap different elements to make it feel like a design has multiple *layers*.

### Everything has an intended size

Don’t scale up SVGs even though they’re theoretically infinitely scalable. SVG icons that were drawn for 16-24px aren’t going to look very great at 3-4x their intended size.

### Don’t scale down screenshots

If you take a full-size screenshot and shrink it by 70% to make it fit, you’ll end up with an image that’s trying to cram way too much detail into far too little space. If you want to include a detailed screenshot in your design, take the screenshot at a smaller screen size instead

### Prevent background bleed

Images with white backgrounds on a white div can cause the image to lose shape. When this happens, try using borders, rings or shadows

## Finishing touches

### Supercharge the defaults

Checkmarks and arrows are great generic choices for a lot of situations, but you can also use something more specific to your content, like a padlock icon for a list of security-related features


![5](assets/book_posts/471/5.jpg)


![6](assets/book_posts/471/6.jpg)

### Don’t overlook empty states

Instead of letting empty states be as is, try incorporating an image to grab the users attention and emphasising the call to action to encourage the next step.

If there are any supporting UI elements that only work when there are elements, consider hiding them entirely until the user has created some content.

