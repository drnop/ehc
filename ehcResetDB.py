#!/usr/bin/python3                                                                                                                         
import json
import sys
import ehcdb
import os


def exception_info(err):
    exc_type, exc_obj, exc_tb = sys.exc_info()
    fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
    estring = "{} {} {} {}".format(err,exc_type, fname, exc_tb.tb_lineno)
    return estring

def main(argv):
    debug_level = 0

    try:
        if 'REQUEST_METHOD' in os.environ:
            post = json.loads(str(sys.stdin.read()))
            fullreset = post["fullreset"]
            debug = False
        else:
            fullreset = True
            debug = True

        mydb = ehcdb.EHCDB()
        mydb.reset_db(fullreset)
        result = {"ehcResult":"OK","fullreset":fullreset}
    except Exception as err:
        result = { "ehcResult":"Error {}".format(mylogger.exception_info(err)) }
    print("Content-type:application/json\n\n")        
    print(json.dumps(result))

if __name__ == "__main__":
    main(sys.argv[1:])
