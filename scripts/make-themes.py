#!/usr/bin/env python

import os, sys
from os.path import dirname, join
from os import listdir
from subprocess import Popen, PIPE
from pyrsistent import v, freeze, thaw
from fn import _
from functools import partial
import json

class L:
    def __init__(self, val, ops=[]):
        self.ops = ops[:]
        self.val = val
        self.res = None

    def map(self, fn):
        return L(self.val, self.ops + [partial(map, fn)])

    def filter(self, fn):
        return L(self.val, self.ops + [partial(filter, fn)])

    def reduce(self, fn, initial):
        return L(self.val, self.ops + [lambda v: reduce(fn, v, initial)])

    def __iter__(self):
        return self.collect()

    def collect(self):
        val = self.val
        for op in self.ops:
            val = op(val)
        return val

    _ = collect

    @property
    def L(self):
        if self.res is None:
            self.res = self.collect()
        return self.res


def c(line):
    p = Popen(line, shell=True, stdout=PIPE, stderr=PIPE)
    return p.stdout.read(), p.stderr.read()


def shoot():
    dr = dirname(__file__)

    files = L(os.listdir(join(dr, 'tmp'))).filter(_.call('endswith', '.html')).map(_[:-5]).L
    print files

    for name in files:
        c(join(dr, '../slimerjs.py') + ' ' + join(dr, 'theme-demo.js') + ' "' + name + '"')
        print 'made', name

if __name__ == '__main__':
    shoot()




# vim: et sw=4 sts=4
