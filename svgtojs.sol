# By Scriptol.com - This script is public domain

# Load a SVG file and save it as a JavaScript object in a js file
# to be loaded by an HTML page.
# The id of the svg file becomes the name of the object
# It is also the root key of the object

print
print "SVG to JavaScript object converter by Scriptol."
text svgname
input "SVG filename? ", svgname

if svgname = "" ? die("End")
dict jso
jso.load(svgname)

text rootkey
for rootkey, text v in jso
	break
/for

int p = svgname.findLast(".")
text jsoname = svgname[0 .. p] + "js"

text svgnode = svgname[0 -- p]

text jsostr = "var " + rootkey + "=" + JSON.stringify(jso, null, ' ')
jsostr.toFile(jsoname)
print jsoname, "saved."
print
print "Include it in an HTML page to be displayed in canvas"