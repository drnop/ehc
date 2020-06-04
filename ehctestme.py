#!/usr/bin/python3
import cgi, os
import sys
import ehc
import ehcdb
import json
import ehclogger

import cgitb; cgitb.enable()

def main(argv):
    try:
        logger = ehclogger.LOGGER(prefix="EHC",logThreshold=7)
        post = str(sys.stdin.read())

        esaconfig = ""
        start = False
        for line in post.splitlines():
            if "<?xml" in line:
                start = True
            if start:
                esaconfig = esaconfig + line + '\n'
            if "</config>" in line:
                start = False

        logger.log_debug(3,esaconfig)
        dbconn = ehcdb.EHCDB()
        dbresult  = dbconn.getEmailConfig()
        configstring  = dbresult["configstring"]
        econfig = json.loads(configstring)
        approved_nameservers = str.split(econfig["approved_nameservers"],",")
        approved_mx_hostnames = str.split(econfig["approved_mx_hostnames"],",")
        ehc_instance = ehc.EHC(esaconfig)
        ehc_instance.get_licenses()
        ehc_instance.check_rules()
        ehc_instance.check_hat()
        ehc_instance.dmarc_check(econfig["domain_name"],approved_nameservers,approved_mx_hostnames)
        tests = ehc_instance.get_result()
        rsp = {"result":"OK"}
        rsp.update({"checks":tests})

    except Exception as err:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        estring = "{} {} {} {}".format(err,exc_type, fname, exc_tb.tb_lineno)
        rsp = {"result":"Error:" + estring}    

    print("Content-type:application/json\n\n")
    print(json.dumps(rsp))

if __name__ == "__main__":
        main(sys.argv[1:])
        

