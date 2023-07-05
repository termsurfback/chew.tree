<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<h3 align='center'>loom.link</h3>
<p align='center'>
  The Base Link Compiler Framework
</p>

<br/>
<br/>
<br/>

## Overview

The `loom.link` project aims to be an advanced compiler for Link Text,
as part of the Base Link ecosystem. It will just be a library which
takes as input paths to files and outputs compiled data structures, and
ultimately should be able to write out JavaScript, Swift, Rust, and
Kotlin.

It uses a cache to first compile things to JavaScript with types, then
without types so the thousands of modules of types doesn't grow the size
of the output bundle.

At first this library is written in TypeScript mostly, until it can be
ultimately rewritten in Base Link Text itself. The `hack` folder
contains stuff on finding dependencies which need to be resolved in the
folder structure defined by the Base Link spec, and for parsing the
parser definitions. Once we can parse the parser definitions, we can use
the parser definitions to parse the "code" format.

## License

Copyright 2023 <a href='https://tune.bond'>TuneBond</a>

Licensed under the Apache License, Version 2.0 (the "License"); you may
not use this file except in compliance with the License. You may obtain
a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

## TuneBond

This is being developed by the folks at [TuneBond](https://tune.bond), a
California-based project for helping humanity master information and
computation. TuneBond started off in the winter of 2008 as a spark of an
idea, to forming a company 10 years later in the winter of 2018, to a
seed of a project just beginning its development phases. It is entirely
bootstrapped by working full time and running
[Etsy](https://etsy.com/shop/mountbuild) and
[Amazon](https://www.amazon.com/s?rh=p_27%3AMount+Build) shops. Also
find us on [Facebook](https://www.facebook.com/tunebond),
[Twitter](https://twitter.com/tunebond), and
[LinkedIn](https://www.linkedin.com/company/tunebond). Check out our
other GitHub projects as well!
