import * as ts from 'typescript';

export function convertTypeScriptToJavaScript(tsCode: string): string {
    const result = ts.transpileModule(tsCode, {
        compilerOptions: {
            module: ts.ModuleKind.CommonJS,
            target: ts.ScriptTarget.ES2020,
        },
    });
    return result.outputText;
}
