(* Copyright (C) 2015-2016 Bloomberg Finance L.P.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * In addition to the permissions granted to you by the LGPL, you may combine
 * or link a "work that uses the Library" with a publicly distributed version
 * of this file to produce a combined library or application, then distribute
 * that combined work under the terms of your choosing, with no requirement
 * to comply with the obligations normally placed on you by section 4 of the
 * LGPL version 3 (or the corresponding section of a later version of the LGPL
 * should you choose to use a later version).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA. *)
let (//) = Ext_filename.combine 

let lib_js = "lib"//"js"
let lib_amd = "lib"//"amdjs"
let lib_goog = "lib" // "goog"
let lib_ocaml = Js_config.lib_ocaml_dir
let lib_bs = "lib" // "bs"
let lib_es6 = "lib" // "es6"
let rev_lib_bs = ".."// ".."


let rev_lib_bs_prefix p = rev_lib_bs // p 
let common_js_prefix p  =  lib_js  // p
let amd_js_prefix p = lib_amd // p 
let goog_prefix p = lib_goog // p  
let es6_prefix p = lib_es6 // p 

let ocaml_bin_install_prefix p = lib_ocaml // p

let lazy_src_root_dir = "$src_root_dir" 
let proj_rel path = lazy_src_root_dir // path

(** it may not be a bad idea to hard code the binary path 
    of bsb in configuration time
*)

let no_dev = ref false 

let install = ref false 

let supported_format x = 
  x = Literals.amdjs ||
  x = Literals.commonjs ||
  x = Literals.goog ||
  x = Literals.es6

let bs_package_output = "-bs-package-output"

(** Assume input is valid 
    {[ -bs-package-output commonjs:lib/js/jscomp/test ]}
*)
let package_flag ~format:fmt dir =
  Ext_string.inter2
    bs_package_output 
    (Ext_string.concat3
       fmt
       Ext_string.single_colon
       (if fmt = Literals.amdjs then 
          amd_js_prefix dir 
        else if fmt = Literals.commonjs then 
          common_js_prefix dir 
        else if fmt = Literals.es6 then 
          es6_prefix dir 
        else goog_prefix dir))
(** js output for each package *)
let package_output ~format:s output=
  let prefix  =
    if s = Literals.commonjs then
      common_js_prefix
    else if s = Literals.amdjs then
      amd_js_prefix
    else if s = Literals.es6 then 
      es6_prefix   
    else goog_prefix
  in
  (proj_rel @@ prefix output )
(* output_file_sans_extension ^ Literals.suffix_js *) 