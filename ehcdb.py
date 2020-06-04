#!/usr/bin/python3

import datetime
import sys
import os
import pymongo
import re
import json

configs = [ "email","testprofile"]

class EHCDB:
    def  __init__(self):

        self.dbconn = None

    def connect(self):

        try:
            myclient = pymongo.MongoClient("mongodb://db:27017/")
            self.mydb = myclient["EHC"]

        except Exception as err:
            self.log_debug("error connecting to db {}".format(self.exception_info(err)))

        
    def exception_info(self,err):
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        estring = "{} {} {} {}".format(err,exc_type, fname, exc_tb.tb_lineno)
        return estring

    def log_debug(self,message):
        if True:
            if 'REQUEST_METHOD' in os.environ :
            # running as CGI, do not print
                pass
            else:
                print(message)
    
    def reset_db(self,fullreset):

        self.connect()

        for c in configs:
            try:
                self.log_debug("drop table {}".format(c))
                mycol = self.mydb[c]
                mycol.drop()
            except Exception as e:
                self.log_debug("exception drop table {}".format(c))


        for c in configs:
            try:
                mycol = self.mydb[c]
                mydict = {"name":c,"config":{}}
                mycol.insert_one(mydict)

            except Exception as err:
                errorstring = self.exception_info(err)
                self.log_debug(errorstring)

                
    def updateConfig(self,table,jsonstring):
        try:
            config = json.loads(jsonstring)
            self.connect()
            mycol = self.mydb[table]
            mycol.drop()
            mydict = {"table":table,"config":config}
            mycol.insert_one(mydict)
            result = {"ehcResult":"OK"}
            return result
        except Exception as err:
            errorstring = self.exception_info(err)
            result = {"ehcResult":"ERROR","info":errorstring }
            raise err                                                                                 


        
    def updateEmailConfig(self,jsonstring):
        return self.updateConfig("email",jsonstring)

    def updateTestProfileconfig(self,jsonstring):
        return self.updateConfig("testprofil",jsonstring)

    def getConfig(self,table):
        try:

            self.connect()
            mycol = self.mydb[table]
            mydict = mycol.find_one()
            result = {}
            configstring = json.dumps(mydict["config"])
            result.update({"configstring":configstring})
            result.update({"ehcResult":"OK"})
            return result
        except Exception as err:
            self.log_debug(0,self.exception_info(err))
            raise



    def getEmailConfig(self):
        return self.getConfig("email")
    
    def getTestProfileConfig(self):
        return self.getConfig("testprofile")

