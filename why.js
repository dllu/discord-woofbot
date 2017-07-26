exports.why = function() {
    if(Math.random() < 0.1) {
        return special();
    } else if(Math.random() < 0.333) {
        return phrase();
    }
    return sentence();
}

function randi(n) {
    return ~~(Math.random()*n);
}

function randc(A) {
    return A[randi(A.length)];
}

function special() {
    return randc([
            'why not?',
            'woof woof!',
            'why indeed?',
            'THERE IS AS YET INSUFFICIENT DATA FOR A MEANINGFUL ANSWER',
            'some mysteries are never meant to be solved',
            "I'm not telling you",
            'you know why',
            'instead of asking me why, how about let\'s play chess?'
            ]);
}

function phrase() {
    return randc([
            function() {return 'for the ' + nouned_verb() + ' ' + prepositional_phrase()},
            function() {return 'because ' + sentence()},
            function() {return 'so as to ' + present_verb() + ' ' + object()},
            function() {return 'to ' + present_verb() + ' ' + object()},
            ])();
}

function preposition() {
    return randc(['of', 'from']);
}

function prepositional_phrase() {
    return preposition() + ' ' + randc([
            function() {return article() + ' ' + noun_phrase()},
            function() {return proper_noun()},
            function() {return accusative_pronoun()},
            ])();
}

function sentence() {
    return subject() + ' ' + predicate();
}

function subject() {
    return randc([
            function() {return proper_noun()},
            function() {return nominative_pronoun()},
            function() {return article() + ' ' + noun_phrase()}
            ])();
}

function proper_noun() {
    return randc([
            'Purple Puppy',
            'Hatsune Miku',
            'Donald Trump',
            'Woofer',
            'Purple Puppies\' Porpoise'
            ]);
}

function noun_phrase() {
    return randc([
            function() {return noun();},
            function() {return noun();},
            function() {return noun();},
            function() {return adjective_phrase() + ' ' + noun_phrase()},
            function() {return adjective_phrase() + ' ' + noun_phrase()},
            function() {return adjective_phrase() + ' ' + noun_phrase()},
            function() {return noun_phrase() + ' and ' + noun_phrase()}
            ])();
}

function noun() {
    return randc([
            'puppy',
            'cat',
            'kitten',
            'dog',
            'stalker',
            'siege tank',
            'marine',
            'marauder',
            'zealot',
            'zergling',
            'baneling',
            'roach',
            'queen',
            'hydralisk',
            'ultralisk',
            'adept',
            'immortal',
            'sentry',
            'high templar',
            'dark templar',
            'archon',
            'liberator',
            'raven',
            'banshee',
            'viking',
            'battlecruiser',
            'phoenix',
            'void ray',
            'carrier',
            'tempest',
            'oracle',
            'mutalisk',
            'viper',
            'corruptor',
            'brood lord',
            'overlord',
            'overseer',
            'high school student'
            ]);
}

function nominative_pronoun() {
    return randc([
            'I',
            'you',
            'he',
            'she',
            'they',
            'we'
            ]);
}

function accusative_pronoun() {
    return randc([
            'me',
            'everyone',
            'her',
            'him',
            'them',
            'us'
            ]);
}

function nouned_verb() {
    return randc([
            'love',
            'approval',
            'satisfaction',
            ]);
}

function adjective_phrase() {
    return randc([
            adjective,
            adjective,
            adjective,
            adjective,
            adjective,
            function() {return adjective_phrase() + ' and ' + adjective_phrase();},
            function() {return intensifier() + ' ' + adjective();},
            function() {return intensifier() + ' ' + adjective();},
            function() {return intensifier() + ' ' + adjective();}
            ])();
}

function pos_intensifier() {
    return randc(['very', 'really', 'somewhat', 'moderately', 'mildly', 'quite']);
}

function intensifier() {
    return randc(['', '', 'not ']) + pos_intensifier();
}

function adjective() {
    return randc([
            'purple',
            'green',
            'orange',
            'red',
            'blue',
            'yellow',
            'pink',
            'ultraviolet',
            'infrared',
            'spotted',
            'fluffy',
            'adorable',
            'terrified',
            'excited',
            'acceptable',
            'catlike',
            'doglike',
            'playful',
            'friendly',
            'spiky',
            'pointy',
            'aerodynamic',
            'checkered',
            'mottled',
            'two-dimensional',
            'tetrahedral',
            'triangular',
            'aggressive',
            'spherical',
            'cute',
            'African American',
            'differentiable',
            'open-source',
            'agreeable',
            'disagreeable',
            'tubular',
            'simply connected',
            ]);
}

function article() {
    return randc(['the', 'some', 'a']);
}

function predicate() {
    return randc([
            function() {return transitive_verb() + ' ' + object();},
            intransitive_verb
            ])();
}

function present_verb() {
    return randc([
            function() {return 'defeat';},
            function() {return 'counter';},
            function() {return 'neutralize';},
            function() {return 'fool';},
            function() {return 'please';},
            function() {return 'satisfy';},
            function() {return 'outwit';},
            function() {return 'obtain ' + object() + ' from';}
            ])();
}

function transitive_verb() {
    return randc([
            'threatened',
            'told',
            'asked',
            'begged',
            'helped',
            'obeyed',
            'commanded',
            'confessed to',
            'hugged',
            'betrayed',
            'attacked',
            'advanced upon',
            ]);
}

function intransitive_verb() {
    return randc([
            'insisted on it',
            'suggested it',
            'told me to',
            'wanted it',
            'knew it was a good idea',
            'had a good feeling about it',
            'demanded it be this way',
            'exploded',
            ]);
}

function object() {
    return randc([
            accusative_pronoun,
            function() {
                var n = noun_phrase();
                var a = article();
                var re = /(a|e|i|o|u)/i;
                if (a == 'a' && n[0].match(re)) {
                    a = 'an';
                }
                return a + ' ' +  n;
            }
            ])();
}
