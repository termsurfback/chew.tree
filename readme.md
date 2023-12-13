<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<p align='center'>
  <img src='https://github.com/termsurf/mesh.note/blob/make/view/base.svg?raw=true' height='192'>
</p>

<h3 align='center'>mesh.note</h3>
<p align='center'>
  The BaseNote Compiler Framework
</p>

<br/>
<br/>
<br/>

## Overview

The `mesh.note` project aims to be an advanced compiler for Link Text,
as part of the BaseNote ecosystem. It will just be a library which takes
as input paths to files and outputs compiled data structures, and
ultimately should be able to write out JavaScript, Swift, Rust, and
Kotlin.

It uses a cache to first compile things to JavaScript with types, then
without types so the thousands of modules of types doesn't grow the size
of the output bundle.

At first this library is written in TypeScript mostly, until it can be
ultimately rewritten in BaseNote Text itself. The `hack` folder contains
stuff on finding dependencies which need to be resolved in the folder
structure defined by the BaseNote spec, and for parsing the parser
definitions. Once we can parse the parser definitions, we can use the
parser definitions to parse the "code" format.

## Compiler Overview

The compiler works in a few rough phases currently:

1. **Parse the text** into a "link tree" (link, the language). This
   generates a simple object tree which we then convert into a more
   general AST.
1. **Generate the central AST**, the "tree". This is the main data
   structure we use for the rest of compiling.
1. **Resolve variable references**. This makes sure all the variables
   have been figured out (even if at this point they are incorrectly
   typed).
1. **Check variable lifetime** to make sure variables are defined in the
   right spots.
1. **Infer types** to figure out the implied and intended types.
1. **Verify type soundness** to make sure the inferred types are
   correctly managed.
1. **Check variable mutability** to make sure variables that can't be
   modified aren't.
1. **Verify borrowing/ownership** to make sure only one owner exists per
   variable.
1. **Generate target language output code ast**.
1. **Write to string**.

Right now we are figuring out how to properly resolve the "central AST",
which is kind of complex because of things being able to be interpolated
in several ways. We have also started on code generation which doesn't
really require the intermediate typechecking steps.

In the evaluation of written text to runtime interpreted code, there are
several possibilities for how a `term`, a `path`, or `text` is compiled.
It can be any of:

- `static-term`: Term is a single term like `foo-bar` with no
  interpolation or paths.
- `dynamic-term`: Term is a single term like `foo-{bar}` with
  interpolation but no paths.
- `static-path`: Path is like `foo-bar/baz` with no interpolation.
- `dynamic-path`: Path is like `foo-{bar}/{baz}-bim` with interpolation.
- `static-text`: Text is like `<hello world>` with no interpolation.
- `dynamic-text`: Text is like `<hello {foo} world>` with interpolation.

Each of these cases is handled independently for the most part, in each
respective term keyword handler.

If it is static, then it is finished compiling it. If it is dynamic, it
might still be able to statically compile it after some binding
resolution, or it may need to be runtime interpolated. You can have
these sorts of situations:

- `{{foo}} bar`: A dynamic "head" term that is resolved at runtime, so
  none of the child link tree is compiled until runtime. This is the
  worst case.
- `foo {{bar}}`: A dynamic child term, which means most of the link tree
  can be compiled except this (possibly a name).
- `foo bar`: Everything is static and can be statically compiled.

At first, each node is progressively resolved as a `MeshGatherType`,
which means it simply collects an array of children, possibly with
dynamic head terms. Then if none of the head terms are dynamic, then it
compiles it into a more specific mesh type based on what it is. This
second-level compilation target is still incomplete however, because
some of the nodes can still be dynamic. So then we try and resolve them,
if they resolve, they are static. If not, they are runtime.

The way the interpolation resolves is like a queue which is continuously
being processed, but which is interrupted often as new things a
recognizable. Eventually it reaches a point where things don't change,
and if all things are complete, then it was a success, otherwise there
were potential errors.

## License

Copyright 2023 <a href='https://term.surf'>TermSurf</a>

Licensed under the Apache License, Version 2.0 (the "License"); you may
not use this file except in compliance with the License. You may obtain
a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

## TermSurf

This is being developed by the folks at [TermSurf](https://term.surf), a
California-based project for helping humanity master information and
computation. Find us on [Twitter](https://twitter.com/termsurfcode),
[LinkedIn](https://www.linkedin.com/company/termsurf), and
[Facebook](https://www.facebook.com/termsurf). Check out our other
[GitHub projects](https://github.com/termsurf) as well!
