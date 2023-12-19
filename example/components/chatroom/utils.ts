//this function detect "@" mentions/tags while typing.
export function detectMentions(input: string) {
  const mentionRegex = /(?:^|\s)@(\w+)/g;
  const matches = [];
  let match;

  while ((match = mentionRegex.exec(input)) !== null) {
    const startIndex = match.index;
    const endIndex = mentionRegex.lastIndex;
    const nextChar = input.charAt(endIndex);

    if (nextChar !== '@') {
      matches.push(match[1]);
    }
  }

  const myArray = input.split(' ');
  const doesExists = myArray.includes('@');

  {
    /* It basically checks that for the below four conditions:
     1. if '@' is at end preceded by a whitespace
     2. if input only contains '@'
     3. if '@' occurs at new line
     4. doesExists checks whether '@' has been typed between two strings
     If any of the above condition is true, it pushes it in the matches list which indicates that member list has to be shown 
    */
  }
  if (
    input.endsWith(' @') ||
    input === '@' ||
    input.endsWith('\n@') ||
    (doesExists && !input.endsWith(' '))
  ) {
    matches.push('');
  }

  return matches;
}

// this function replaces the last @mention from the textInput if we have clicked on a tag from suggestion
export function replaceLastMention(
  input: string,
  taggerUserName: string,
  mentionUsername: string,
  UUID: string,
) {
  let mentionRegex: RegExp;

  if (taggerUserName === '') {
    mentionRegex = /(?<=^|\s)@(?=\s|$)/g;
  } else {
    mentionRegex = new RegExp(
      `@${taggerUserName}\\b(?!.*@${taggerUserName}\\b)`,
      'gi',
    );
  }
  const replacement = `@[${mentionUsername}](${UUID}) `;
  const replacedString = input?.replace(mentionRegex, replacement);
  return replacedString;
}
