## Fundamentals

### Categories of models

* **Regression**: consists of predicting a continuous-valued vector

* **Classification**: aims at predicting a value from a finite set

* **Density modeling**: model the probability density function of the data. 

Both **regression** and **classification** are referred to as supervised learning as the target value is provided during training.

Tensors are N dimensional arrays that can be used to represent things like time series data, 2D structured data, or activations between neuron nodes.

### Loss

* **Mean squared error** is typically used when predicting a continuous value

* **Cross entropy** is used to measure the loss in classification models, where the output of the model is a vector with one probability per class

* **Contrastive loss** can be used for metric learning, where the objective is to construct metrics or labels from weakly supervised data. The constructed metrics can then be used for clustering or classification, for example.

Losses just a proxy for the actual measurements that we want to minimise. 

### Tokenisation

Language representation can be done on a character, word, sentence, or paragraph level for granularity.

### Optimisation

Most optimisers start by initialising randomly initialising the weights, and then improves upon this estimate through gradient steps. It does this by using the whole dataset to compute the gradients, and then subtracting a fraction of it depending on the learning rate.

Stochastic Gradient Descent uses samples of the dataset instead to estimate the direction in which to step, thus making it much less computationally intensive compared to regular gradient descent. However, the gradient updates are noisier as they do not contain the entire dataset, but it can also help escape a local minima more easily.

Mini batch gradient descent is a middle ground between GD and SGD, where it updates its weights based on a small batch of the training data, rather than only using a single sample in the case of SGD or the entire dataset in the case of GD.

## Backprop

Backpropagation is a method to calculate the gradients of the loss function. The optimiser can then use this graph to update the weights of the model.

## Vanishing/exploding gradient

Historical deep learning issue where the gradient becomes infinitely large or small as it backprops through the network. When this happens, it usually makes further training impossible



## Model components

Layers are generic tensor operations that often contain trainable parameters

### Linear layers

* Fully connected layers contain a trainable weight matrix W and a bias vector b. FC layers serve as a linear mapping method that preserves points, straight lines, and points, and can be used for translations as well as dimension reduction

* Convolutional layers are also linear mapping methods that can process time-series or 2D data locally. These layers also have additional metaparameters: padding (how many zero coefficients should be added around the input tensor), stride (the step size when going through the input), and dilation (the index count between filter coefficients of the local affine operator)

* The output of convolutions is usually smaller than the input, and are used to reduce the spatial size of the representation. This increases the number of channels, which translates into a richer local representation.

* Multiple convolutions stacked together (CNNs) is the usual model architecture for translating images or sounds into lower dimensional tensors

## Activation functions

As most of the world’s data is nonlinear, activation functions introduce that nonlinearity in what would otherwise be a linear function. The most popular one being ReLU, which sets negative values to zero and keeps the positive values unchanged. Leaky ReLU applies a small positive multiplying factor to the negative values, which still solves for vanishing gradient but doesn’t delete the negative values entirely.

## Pooling

An operation that combines multiple activations into one that ideally summarises the information. A pooling layer typically computes the max activation per channel over non overlapping sub tensors. Just like convolutional layers, pooling layers also have padding, stride, and dilation.

## Dropout

Aims to improve the performance of the learned function by zeroing each activation of the input tensor based on a probability, and rescaling the activations to maintain the expected value. The idea behind dropout is to encourage individual activations and discourage group representations.

## Normalising layers

Forces the empirical mean and variance of groups of activations. The main norm layer is the batch norm, which processes batches instead of individual samples.

## Skip connections

Another technique that mitigates the vanishing gradient problem. A component that outputs some of the layers further deeper in the model, thereby bypassing the layers in between.

## Attention

Combines local information at locations far apart in a tensor. FC and convolutional layers cannot do this due to speed and architecture. Computes an attention score for each component of the resulting tensor to each component of the input tensor, without locality constraints, and averages the features across the full tensor accordingly.

## Token embedding

Converts discrete tokens or integers into vectors

## Positional encoding

Helps convolutional and multi-head attention layers with access to absolute positioning. Usually helps in image synthesis and natural language processing. 



# Architectures

## Multi layer perceptron

The most basic DL architecture, a series of FC layers separated by activation functions.

## CNN

Standard architecture for processing images, combines multiple convolutional layers. Residual networks addresses the issue of vanishing gradients with residual connections, which allow for hundreds of connections. ResNets are composed of residual blocks, each combining several convolutional layers, batch norm layers, and ReLU layers, wrapped in a residual connection.

As the parameter count and the computational cost of convolutions are quadratic with the total number of channels, residual blocks solve this by reducing the number of channels with a 1x1 convolution, then operating spatially with a 3x3 convolution before upscaling the number of channels again with a 1x1 convolution.

## Transformer

Designed for sequence-to-sequence translation, it uses an encoder that converts the input into a representation, and a autoregressive decoder that generates each token of the token result sequence, given the encoder’s representation of the input and the output tokens generated so far.

Both the encoder and decoder are sequences of compounded blocks built with residual networks


![0](assets/book_posts/430/0.jpg)


![1](assets/book_posts/430/1.jpg)

The encoder of the Transformer recodes the input sequence of discrete tokens with an embedding layer and adds a positional encoding before processing it with several self-attention blocks to generate a refined representation.

The decoder takes the result tokens produced so far, recodes them through an embedding layer, adds positional encoding, and processes it through the alternating causal self-attention blocks and cross-attention blocks to produce logits predicting the next tokens.

## GPT

A pure autoregressive model that consists of a succession of causal self-attention blocks, which is a causal version of the original Transformer’s encoder. Scales extremely well, up to potentially hundreds of billions of trainable parameters

## Vision Transformer

Used for image classification, ViT splits the image into patches before it is flattened and concatenated into a single vector.



# Applications

## Image denoising

## Image classification

## Object detection

The position of an object is the four coordinates that form the bounding box of the object. The standard approach to solve this task is to use a CNN that produces a sequence of image representations with decreasing spatial resolution. 

## Semantic segmentation

Can be achieved with a standard convolutional neural network that outputs a convolutional map with as many channels as classes. 

## Speech recognition

Converts a sound sample into a sequence of words. Most modern techniques use a sequence-to-sequence translation and then solving it with a attention-based Transformer. First convert the sound signal into a spectrogram, which is processed through a few 1D convolutional layers, and then fed into the encoder of the Transformer. 

## Text-image representations

CLIP combines an image encoder, with is a ViT, and a text encoder, which is a GPT. Instead of the GPT acting like a text encoder, a end of sentence token is added to the input sentence and used as a embedding.

## RL

Strategy games often consist of a discrete state process and a reward process that can be modulated by choosing different actions. RL introduces an optimal state-action value/reward function, which is the expected return if we execute action a in the state s, and then follow the optimal policy.



# Synthesis

## Text generation

GPT trained on large datasets are LLMs. Prompting and fine-tuning helps with guiding model behavior

## Image generation

The principle of diffusion consists of a process that gradually degrades any sample, and then diffuses the noise back into an image.


![2](assets/book_posts/430/2.jpg)

Diffusion models initially hallucinates structures by luck in the random noise, and then gradually builds more elements that emerge from the noise by reinforcing the most likely outcomes



# Missing bits

## RNN

Attention models seems to outperform so out of fashion

## Autoencoder/Variational Autoencoder

Used for denoising, can also be used to discover low dimensional parameterisation of the data. Maybe somewhat like a lossy compression?

## GAN

Out of fashion compared to diffusion

## Graph neural network

## Self-supervised training

